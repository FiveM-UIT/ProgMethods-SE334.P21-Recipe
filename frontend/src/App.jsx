'use client';

import { useState } from 'react';
import axios from 'axios';
import {
	Search,
	ChefHat,
	Star,
	Clock,
	AlertCircle,
	Loader
} from 'lucide-react';
import './index.css';

// Danh sách nguyên liệu phổ biến
const popularIngredients = [
	'thit ga',
	'thit bo',
	'hanh',
	'tom',
	'trung',
	'rau thom',
	'muc'
];

export default function App() {
	const [ingredients, setIngredients] = useState('');
	const [suggestions, setSuggestions] = useState([]);
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	const addIngredient = (ingredient) => {
		const currentIngredients = ingredients
			.split(',')
			.map(i => i.trim())
			.filter(i => i);

		if (!currentIngredients.includes(ingredient)) {
			const newIngredients = [...currentIngredients, ingredient];
			setIngredients(newIngredients.join(', '));
		}
	};

	const getSuggestions = async () => {
		if (!ingredients.trim()) {
			setError('Vui lòng nhập ít nhất một nguyên liệu');
			return;
		}

		setIsLoading(true);
		try {
			const ingredientList = ingredients
				.split(',')
				.map((i) => i.trim())
				.filter((i) => i);

			const response = await axios.post('/api/suggest', {
				ingredients: ingredientList,
			});

			const enhancedSuggestions = response.data.suggestions.map(recipe => ({
				name: recipe,
				description: 'Món ăn tuyệt vời được chế biến từ những nguyên liệu bạn có.',
				rating: (Math.random() * (5 - 4) + 4).toFixed(1),
				cookTime: `${Math.floor(Math.random() * 30 + 15)} phút`,
				difficulty: ['Dễ', 'Trung bình', 'Khó'][Math.floor(Math.random() * 3)]
			}));

			setSuggestions(enhancedSuggestions);
			setError('');
		} catch (err) {
			setError('Đã xảy ra lỗi khi lấy đề xuất. Vui lòng thử lại.');
			setSuggestions([]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-5xl mx-auto px-4 py-12">
				{/* Header */}
				<div className="text-center mb-12">
					<ChefHat className="w-12 h-12 mx-auto mb-4 text-gray-800" />
					<h1 className="text-4xl font-bold text-gray-900 mb-2">Đầu Bếp Ảo</h1>
					<p className="text-gray-600">Khám phá công thức nấu ăn từ nguyên liệu của bạn</p>
				</div>

				{/* Search Section */}
				<div className="bg-white rounded-lg shadow-sm p-6 mb-8">
					<div className="relative">
						<input
							type="text"
							placeholder="Nhập nguyên liệu của bạn (VD: thịt gà, hành tây...)"
							value={ingredients}
							onChange={e => setIngredients(e.target.value)}
							className="w-full px-4 py-3 pl-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
							onKeyPress={e => e.key === 'Enter' && getSuggestions()}
						/>
						<Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
					</div>

					{/* Popular Ingredients */}
					<div className="mt-4">
						<p className="text-sm text-gray-500 mb-2">Nguyên liệu phổ biến:</p>
						<div className="flex flex-wrap gap-2">
							{popularIngredients.map((ingredient, index) => (
								<button
									key={index}
									onClick={() => addIngredient(ingredient)}
									className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
								>
									{ingredient}
								</button>
							))}
						</div>
					</div>

					<button
						onClick={getSuggestions}
						disabled={isLoading}
						className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
					>
						{isLoading ? (
							<span className="flex items-center justify-center">
								<Loader className="animate-spin mr-2 h-5 w-5" />
								Đang tìm kiếm...
							</span>
						) : (
							'Tìm công thức'
						)}
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8 flex items-center">
						<AlertCircle className="h-5 w-5 mr-2" />
						{error}
					</div>
				)}

				{/* Recipe Results */}
				{suggestions.length > 0 && !isLoading && (
					<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
						{suggestions.map((recipe, index) => (
							<div key={index} className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
								<h3 className="text-lg font-semibold text-gray-900 mb-2">{recipe.name}</h3>
								<p className="text-gray-600 text-sm mb-4">{recipe.description}</p>
								<div className="flex items-center justify-between text-sm text-gray-500">
									<div className="flex items-center">
										<Star className="h-4 w-4 text-yellow-400 mr-1" />
										{recipe.rating}
									</div>
									<div className="flex items-center">
										<Clock className="h-4 w-4 mr-1" />
										{recipe.cookTime}
									</div>
									<span className="text-blue-600">{recipe.difficulty}</span>
								</div>
							</div>
						))}
					</div>
				)}

				{/* Empty State */}
				{!error && suggestions.length === 0 && !isLoading && (
					<div className="text-center bg-white rounded-lg shadow-sm p-8">
						<ChefHat className="w-12 h-12 mx-auto mb-4 text-gray-400" />
						<h3 className="text-xl font-semibold text-gray-900 mb-2">
							Bắt đầu tìm kiếm
						</h3>
						<p className="text-gray-600">
							Nhập nguyên liệu bạn có và khám phá các công thức nấu ăn tuyệt vời
						</p>
					</div>
				)}
			</div>
		</div>
	);
}