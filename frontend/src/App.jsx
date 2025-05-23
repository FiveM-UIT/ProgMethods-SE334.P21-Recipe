'use client';

import { useState } from 'react';
import axios from 'axios';
import {
	ChefHat,
	Utensils,
	Loader2,
	Sparkles,
	Search,
	ArrowRight,
	Star,
	Heart,
	Clock,
	Users
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

			// Transform API response to include additional mock data
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
		<div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 relative overflow-hidden">
			{/* Animated background elements */}
			<div className="absolute inset-0 overflow-hidden pointer-events-none">
				<div className="absolute top-20 left-20 w-32 h-32 bg-orange-200 rounded-full opacity-20 animate-pulse"></div>
				<div className="absolute top-40 right-32 w-24 h-24 bg-amber-200 rounded-full opacity-30 animate-bounce" style={{ animationDelay: '1s' }}></div>
				<div className="absolute bottom-32 left-32 w-40 h-40 bg-yellow-200 rounded-full opacity-25 animate-pulse" style={{ animationDelay: '2s' }}></div>
				<div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-300 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s' }}></div>
			</div>

			<div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
				{/* Header */}
				<header className="text-center mb-12">
					<div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-2xl mb-6 shadow-lg transform hover:scale-105 transition-transform duration-300">
						<ChefHat className="h-10 w-10 text-white mr-2" />
						<Sparkles className="h-8 w-8 text-white animate-pulse" />
					</div>
					<h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-4">
						Đầu Bếp Ảo
					</h1>
					<p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
						Biến những nguyên liệu đơn giản thành những món ăn tuyệt vời! ✨
					</p>
					<div className="flex items-center justify-center mt-4 space-x-6 text-sm text-gray-500">
						<div className="flex items-center">
							<Heart className="h-4 w-4 mr-1 text-red-400" />
							1.2M+ yêu thích
						</div>
						<div className="flex items-center">
							<Star className="h-4 w-4 mr-1 text-yellow-400" />
							4.9/5 đánh giá
						</div>
					</div>
				</header>

				{/* Main Input Section */}
				<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8 mb-8 border border-white/20 hover:shadow-3xl transition-all duration-500">
					<div className="mb-8">
						<label htmlFor="ingredients" className="block text-lg font-semibold text-gray-700 mb-4 flex items-center">
							<Search className="h-5 w-5 mr-2 text-orange-500" />
							Nguyên liệu của bạn
						</label>
						<div className="relative group">
							<input
								id="ingredients"
								type="text"
								placeholder="Ví dụ: thit ga, trung, hanh, ..."
								value={ingredients}
								onChange={e => setIngredients(e.target.value)}
								className="border-2 border-gray-200 p-6 pl-14 w-full rounded-2xl focus:ring-4 focus:ring-orange-200 focus:border-orange-400 outline-none transition-all duration-300 text-lg group-hover:border-orange-300 bg-gray-50/50"
								onKeyPress={e => e.key === 'Enter' && getSuggestions()}
							/>
							<div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
								<Search className="h-6 w-6 text-gray-400 group-hover:text-orange-400 transition-colors" />
							</div>
						</div>
						<p className="mt-3 text-sm text-gray-500 flex items-center">
							<Sparkles className="h-4 w-4 mr-1" />
							Phân cách bởi dấu phẩy hoặc chọn từ danh sách phổ biến bên dưới
						</p>
					</div>

					{/* Popular Ingredients */}
					<div className="mb-8">
						<h3 className="text-md font-semibold text-gray-700 mb-4 flex items-center">
							<Star className="h-4 w-4 mr-2 text-amber-500" />
							Nguyên liệu phổ biến
						</h3>
						<div className="flex flex-wrap gap-3">
							{popularIngredients.map((ingredient, index) => (
								<button
									key={index}
									onClick={() => addIngredient(ingredient)}
									className="px-4 py-2 bg-gradient-to-r from-orange-100 to-amber-100 hover:from-orange-200 hover:to-amber-200 text-orange-700 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-md border border-orange-200"
								>
									{ingredient}
								</button>
							))}
						</div>
					</div>

					<button
						onClick={getSuggestions}
						disabled={isLoading}
						className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed text-lg flex items-center justify-center group"
					>
						{isLoading ? (
							<>
								<Loader2 className="h-6 w-6 mr-3 animate-spin" />
								Đang tìm kiếm công thức tuyệt vời...
							</>
						) : (
							<>
								<ChefHat className="h-6 w-6 mr-3 group-hover:animate-bounce" />
								Tìm Món Ăn Ngon
								<Sparkles className="h-5 w-5 ml-2 group-hover:animate-pulse" />
							</>
						)}
					</button>
				</div>

				{/* Error Message */}
				{error && (
					<div className="bg-red-50 border-2 border-red-200 text-red-700 px-6 py-4 rounded-2xl mb-8 flex items-center animate-shake">
						<div className="w-2 h-2 bg-red-500 rounded-full mr-3 animate-pulse"></div>
						{error}
					</div>
				)}

				{/* Loading State */}
				{isLoading && (
					<div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-12 text-center">
						<div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full mb-6">
							<ChefHat className="h-8 w-8 text-white animate-bounce" />
						</div>
						<h3 className="text-2xl font-semibold text-gray-800 mb-2">Đang nấu ăn...</h3>
						<p className="text-gray-600">Chúng tôi đang tìm những công thức tuyệt vời nhất cho bạn!</p>
						<div className="flex justify-center mt-6">
							<div className="flex space-x-2">
								<div className="w-3 h-3 bg-orange-400 rounded-full animate-bounce"></div>
								<div className="w-3 h-3 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
								<div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
							</div>
						</div>
					</div>
				)}

				{/* Suggestions */}
				{suggestions.length > 0 && !isLoading && (
					<div className="space-y-6">
						<div className="text-center mb-8">
							<h2 className="text-3xl font-bold text-gray-800 mb-2 flex items-center justify-center">
								<Utensils className="h-8 w-8 mr-3 text-orange-500" />
								Món Ăn Đề Xuất
								<Sparkles className="h-6 w-6 ml-2 text-amber-500 animate-pulse" />
							</h2>
							<p className="text-gray-600">Chúng tôi đã tìm thấy {suggestions.length} món ăn tuyệt vời cho bạn!</p>
						</div>

						<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
							{suggestions.map((recipe, index) => (
								<div
									key={index}
									className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] p-6 border border-white/20 group"
									style={{ animationDelay: `${index * 0.1}s` }}
								>
									<div className="flex items-start justify-between mb-4">
										<div className="flex-1">
											<h3 className="text-xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors mb-2">
												{recipe.name}
											</h3>
											<p className="text-gray-600 text-sm leading-relaxed">
												{recipe.description}
											</p>
										</div>
										<div className="flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 px-3 py-1 rounded-full ml-3">
											<Star className="h-4 w-4 text-yellow-500 mr-1" />
											<span className="text-sm font-semibold text-gray-700">{recipe.rating}</span>
										</div>
									</div>

									<div className="flex items-center justify-between pt-4 border-t border-gray-100">
										<div className="flex items-center text-gray-500 text-sm">
											<Clock className="h-4 w-4 mr-1 text-orange-400" />
											{recipe.cookTime}
										</div>
										<div className="flex items-center text-gray-500 text-sm">
											<Users className="h-4 w-4 mr-1 text-amber-400" />
											{recipe.difficulty}
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Empty State */}
				{!error && suggestions.length === 0 && !isLoading && (
					<div className="text-center p-12 bg-white/60 backdrop-blur-sm rounded-3xl shadow-lg border border-white/20">
						<div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full mb-6">
							<ChefHat className="h-12 w-12 text-gray-400" />
						</div>
						<h3 className="text-2xl font-semibold text-gray-700 mb-4">
							Sẵn sàng nấu ăn?
						</h3>
						<p className="text-gray-500 text-lg max-w-md mx-auto leading-relaxed">
							Nhập nguyên liệu bạn có và để chúng tôi gợi ý những món ăn tuyệt vời!
						</p>
						<div className="mt-6 flex justify-center">
							<div className="flex items-center space-x-2 text-sm text-gray-400">
								<Sparkles className="h-4 w-4" />
								<span>Hơn 10,000+ công thức đang chờ bạn khám phá</span>
								<Sparkles className="h-4 w-4" />
							</div>
						</div>
					</div>
				)}
			</div>

			<style jsx>{`
				@keyframes shake {
					0%, 100% { transform: translateX(0); }
					25% { transform: translateX(-5px); }
					75% { transform: translateX(5px); }
				}
				.animate-shake {
					animation: shake 0.5s ease-in-out;
				}
			`}</style>
		</div>
	);
}