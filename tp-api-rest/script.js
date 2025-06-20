var API_BASE = 'https://rickandmortyapi.com/api/character/'

var btnFetchAll = document.getElementById('fetchAll')
var formFilter = document.getElementById('filterForm')
var table = document.getElementById('output-table')

btnFetchAll.addEventListener('click', function () {
    fetchCharacters(API_BASE)
})

formFilter.addEventListener('submit', function (e) {
    e.preventDefault()

    var params = []
    var name = document.getElementById('name').value.trim()
    var status = document.getElementById('status').value
    var species = document.getElementById('species').value.trim()
    var type = document.getElementById('type').value.trim()
    var gender = document.getElementById('gender').value

    if (name) {
        params.push('name=' + name)
    }
    if (status) {
        params.push('status=' + status)
    }
    if (species) {
        params.push('species=' + species)
    }
    if (type) {
        params.push('type=' + type)
    }
    if (gender) {
        params.push('gender=' + gender)
    }

    var url = API_BASE + ('?' + params.join('&'))
    fetchCharacters(url)
})

function fetchCharacters(url) {
    clearTable()
    fetch(url)
        .then(function (response) {
            if (!response.ok) {
                showError(
                    'No se encontraon personajes o hubo un error en la solicitud'
                )
            }
            return response.json()
        })
        .then(function (data) {
            if (!data.results || !data.results.length) {
                showError('No se encontraron personajes.')
            } else {
                renderTable(data.results)
            }
        })
        .catch(function (err) {
            showError(err.message || 'Error al procesar la respuesta.')
        })
}

function clearTable() {
    while (table.rows.length > 1) {
        table.deleteRow(1)
    }
}

function showError(message) {
    clearTable()
}

function renderTable(characters) {
    for (var i = 0; i < characters.length; i++) {
        var ch = characters[i]
        var row = table.insertRow(-1)

        var cellName = row.insertCell(-1)
        cellName.textContent = ch.name

        var cellStatus = row.insertCell(-1)
        cellStatus.textContent = ch.status

        var cellSpecies = row.insertCell(-1)
        cellSpecies.textContent = ch.species

        var cellType = row.insertCell(-1)
        cellType.textContent = ch.type || '-'

        var cellGender = row.insertCell(-1)
        cellGender.textContent = ch.gender

        var cellOrigin = row.insertCell(-1)
        cellOrigin.textContent = ch.origin.name

        var cellLocation = row.insertCell(-1)
        cellLocation.textContent = ch.location.name

        var cellImage = row.insertCell(-1)
        var img = document.createElement('img')
        img.src = ch.image
        img.alt = ch.name
        img.style.width = '60px'
        img.style.borderRadius = '4px'
        cellImage.appendChild(img)
    }
}
