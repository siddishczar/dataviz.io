# dataviz.io
AI Data visualization tool that lets you input a prompt and output a graph/plot.

1) You'll have to get a FRED API key and an OpenAI API key and configure them in .env and using dotenv() in JS.
2) You'll have to enable cross tracking in your browser setting (for example, disable browser restrictions).
3) You will have to finetune the model using the finetuning2.jsonl (the first one is outdated). You theoretically could just use the model that I ahev tho, so you could skip this. You still need to generate the API.
4) After this, you will just need to install the nessecary packages (chart.js, openai.js, cors, etc.). You should be all set! Run the code through LiveServer. 
