const form = document.getElementById('searchForm');
const searchInput = document.getElementById('search');
const searchResults = document.getElementById('searchResults');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  searchResults.innerHTML = 'Buscando...';

  const searchQuery = searchInput.value;
  const response = await fetch(`/search?query=${searchQuery}`);
  const data = await response.json();

  if (data.length === 0) {
    searchResults.innerHTML = 'Nenhum resultado encontrado';
    return;
  }

  let resultHTML = '<ul>';
  data.forEach(item => {
    resultHTML += `<li>${item.codigo} - ${item.nome} (${item.tipo})</li>`;
  });
  resultHTML += '</ul>';

  searchResults.innerHTML = resultHTML;
});
