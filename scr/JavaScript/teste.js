const cepInput = document.getElementById('cep');

cepInput.addEventListener('blur', async () => {
  const cep = cepInput.value.trim();

  if (cep.length !== 8 || isNaN(cep)) {
    alert("Digite um CEP válido com 8 números.");
    return;
  }

  const viaCepURL = `https://viacep.com.br/ws/${cep}/json/`;

  try {
    const response = await fetch(viaCepURL);
    const data = await response.json();

    if (data.erro) {
      alert("CEP não encontrado.");
      return;
    }
    
    document.getElementById('rua').value = data.logradouro;
    document.getElementById('bairro').value = data.bairro;
    document.getElementById('cidade').value = data.localidade;
    document.getElementById('estado').value = data.uf;

    buscarClima(data.localidade);
  } catch (error) {
    alert("Erro ao buscar CEP.");
    console.error(error);
  }
});

async function buscarClima(cidade) {
  const apiKey = 'MYKEY'; 
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade},BR&appid=${apiKey}&units=metric&lang=pt_br`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    const descricao = data.weather[0].description;
    const temperatura = data.main.temp;

    document.getElementById('descricao').textContent = `Tempo: ${descricao}`;
    document.getElementById('temperatura').textContent = `Temperatura: ${temperatura}°C`;
  } catch (error) {
    document.getElementById('descricao').textContent = "Não foi possível obter o clima.";
    document.getElementById('temperatura').textContent = "";
    console.error(error);
  }
}