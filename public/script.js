const button = document.getElementById('button');
const dataList = document.getElementById('data')

button.addEventListener('click', () => 
    fetchDataJSON().then(data=> {
    console.log(data)
            data.forEach(person => {
                li = document.createElement('li');
                li.appendChild(document.createTextNode(`${person.name}: ${person.number}`))
                dataList.appendChild((li))
            })
  }))


async function fetchDataJSON() {
    const response = await fetch('http://localhost:5000/data.json');
    const data = await response.json();
    return data;
}
  