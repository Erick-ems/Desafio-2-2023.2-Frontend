const selectElement = document.getElementById("itensSelect");
const tableBody = document.getElementById("municipiosTableBody");

// Fazer uma solicitação para a API do IBGE para obter estados
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(response => response.json())
  .then(data => {
    data.forEach(estado => {
      const option = document.createElement("option");
      option.value = estado.id;
      option.text = estado.sigla;
      selectElement.appendChild(option);
    });

    const estadoPreSelecionado = 'SP';
    selectElement.value = data.find(estado => estado.sigla === estadoPreSelecionado).id;

    // Disparar manualmente o evento de mudança para carregar os municípios
    const changeEvent = new Event('change');
    selectElement.dispatchEvent(changeEvent);
  })
  .catch(error => {
    console.error("Erro ao buscar dados da API do IBGE para obter estados: " + error);
  });

// Adicionar um evento de mudança ao select para carregar municípios do estado selecionado
selectElement.addEventListener("change", () => {
  const selectedUFId = selectElement.value;

  // Limpar a tabela antes de adicionar novos municípios
  tableBody.innerHTML = "";

  // Fazer uma solicitação para a API do IBGE para obter municípios do estado selecionado
  fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUFId}/municipios`)
    .then(response => response.json())
    .then(municipios => {
      // Preencher a tabela com os municípios
      municipios.forEach(municipio => {
        const row = tableBody.insertRow();
        const cell = row.insertCell(0);
        cell.textContent = municipio.nome;
      });
    })
    .catch(error => {
      console.error("Erro ao buscar dados da API do IBGE para obter municípios: " + error);
    });
});
