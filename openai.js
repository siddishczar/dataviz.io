document.addEventListener('DOMContentLoaded', () => {
    const button = document.getElementById('circle-button');
    const input = document.getElementById('prompt-input');
    const testQuery = document.getElementById('testQuery');
    /*
    localStorage.removeItem('fredSeriesId');
    localStorage.removeItem('x-axis');
    localStorage.removeItem('y-axis');
    localStorage.removeItem('graphType'); */
  
    button.addEventListener('click', async () => {

      const prompt = input.value;
  
      if (!prompt) {
        alert('Please enter a prompt');
        return;
      }
  
      try {
        const response = await fetch('http://localhost:3010/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ prompt }),
        });
  
        const data = await response.json();
        const splitArray = JSON.stringify(data.response).split(', ').map(part => part.replace(/^"|"$/g, ''));
        localStorage.setItem('fredSeriesId', splitArray[0]);
        localStorage.setItem('graphType', splitArray[1]);
        localStorage.setItem('x-axis', splitArray[2]);
        localStorage.setItem('y-axis', splitArray[3]);

        // Display the raw JSON response in the testQuery element
        testQuery.textContent = JSON.stringify(data.response, null, 2); // Pretty print with 2 spaces indentation
  
      } catch (error) {
            console.error('Error:', error);
            testQuery.textContent = `Error fetching data: ${error.message}`;
      }
          
    });
  });
  