const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const app = express()
const port = 3001

app.use(bodyParser.json())
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	)
	next()
})

app.post('/suggest', (req, res) => {
	const ingredients = req.body.ingredients
		.map(i => i.toLowerCase())
		.join("', '")
	const query = `swipl -s recipes.pl -g "findall(R, suggest_recipe(['${ingredients}'], R), List), writeln(List)." -t halt`

	exec(query, (error, stdout, stderr) => {
		if (error || stderr) {
			console.error('Error:', error || stderr)
			return res.status(500).send({ error: 'Error processing Prolog query' })
		}
		const suggestions = stdout
			.trim()
			.replace(/[\[\]]/g, '')
			.split(',')
			.map(s => s.trim().replace(/^'|'$/g, ''))
			.filter(s => s.length > 0)
		res.json({ suggestions })
	})
})

app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`)
})
