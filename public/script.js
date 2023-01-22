const button = document.getElementById('button');
const dataList = document.getElementById('data')

button.addEventListener('click',() => {
    fetch('http://localhost:5000/data.json')
        .then(res => res.json())
        .then(data => {
            data.forEach(person => {
                li = document.createElement('li');
                li.appendChild(document.createTextNode(`${person.name}: ${person.number}`))
                dataList.appendChild((li))
            })
        })
})