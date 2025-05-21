'use client'

import { useState } from 'react'
import axios from 'axios'
import { Utensils, Search, Loader2 } from 'lucide-react'
import './App.css'

function App() {
	const [ingredients, setIngredients] = useState('')
	const [suggestions, setSuggestions] = useState([])
	const [error, setError] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const getSuggestions = async () => {
		if (!ingredients.trim()) {
			setError('Vui lòng nhập ít nhất một nguyên liệu')
			return
		}

		setIsLoading(true)
		try {
			const ingredientList = ingredients
				.split(',')
				.map(i => i.trim())
				.filter(i => i)

			const response = await axios.post('http://localhost:3001/suggest', {
				ingredients: ingredientList
			})

			setSuggestions(response.data.suggestions)
			setError('')
		} catch (err) {
			setError('Đã xảy ra lỗi khi lấy đề xuất. Vui lòng thử lại.')
			setSuggestions([])
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
			<div className="container mx-auto px-4 py-12 max-w-3xl">
				<header className="text-center mb-10">
					<div className="inline-flex items-center justify-center p-3 bg-amber-100 rounded-full mb-4">
						<Utensils className="h-8 w-8 text-amber-600" />
					</div>
					<h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
						Đề Xuất Món Ăn
					</h1>
					<p className="text-gray-600 max-w-md mx-auto">
						Nhập các nguyên liệu bạn có và nhận đề xuất món ăn ngon
					</p>
				</header>

				<div className="bg-white rounded-xl shadow-md p-6 mb-8">
					<div className="mb-6">
						<label
							htmlFor="ingredients"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Nguyên liệu của bạn
						</label>
						<div className="relative">
							<input
								id="ingredients"
								type="text"
								placeholder="Ví dụ: thịt gà, hành, cà rốt, gạo"
								value={ingredients}
								onChange={e => setIngredients(e.target.value)}
								className="border border-gray-300 p-4 pl-12 w-full rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition"
							/>
							<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
								<Search className="h-5 w-5 text-gray-400" />
							</div>
						</div>
						<p className="mt-2 text-sm text-gray-500">Cách nhau bởi dấu phẩy</p>
					</div>

					<button
						onClick={getSuggestions}
						disabled={isLoading}
						className="w-full bg-amber-500 hover:bg-amber-600 text-white font-medium px-4 py-3 rounded-lg transition flex items-center justify-center disabled:opacity-70"
					>
						{isLoading ? (
							<>
								<Loader2 className="h-5 w-5 mr-2 animate-spin" />
								Đang xử lý...
							</>
						) : (
							'Đề Xuất Món Ăn'
						)}
					</button>
				</div>

				{error && (
					<div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
						{error}
					</div>
				)}

				{suggestions.length > 0 && (
					<div className="bg-white rounded-xl shadow-md p-6">
						<h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
							<Utensils className="h-5 w-5 mr-2 text-amber-500" />
							Món ăn đề xuất
						</h2>
						<ul className="space-y-3">
							{suggestions.map((recipe, index) => (
								<li
									key={index}
									className="p-3 bg-amber-50 rounded-lg hover:bg-amber-100 transition"
								>
									<span className="text-gray-800">{recipe}</span>
								</li>
							))}
						</ul>
					</div>
				)}

				{!error && suggestions.length === 0 && !isLoading && (
					<div className="text-center p-8 bg-white rounded-xl shadow-md">
						<p className="text-gray-500">
							Nhập nguyên liệu và nhấn "Đề Xuất Món Ăn" để nhận gợi ý.
						</p>
					</div>
				)}
			</div>
		</div>
	)
}

export default App
