Parse.initialize('jFc8weoj0ooJf9ImqkiTjVg8bkJ1FfPS9nBPjUHS', '1jzfDQ7nCu6UgkoBAwUpqQ3mpg8hpEL5t6auoAAZ');
Parse.serverURL = 'https://parseapi.back4app.com';

async function fetchDataAndDisplay() {
    const TestObject = Parse.Object.extend('TestObject');
    const query = new Parse.Query(TestObject);
    try {
        const results = await query.find();

        // Manipular os dados obtidos
        const quantidadeEscolas = results.length;
        const quantidadeComEnergia = results.filter(result => result.get('temEnergia')).length;
        const quantidadeComAgua = results.filter(result => result.get('temAgua')).length;
        const quantidadeComColetaSeletiva = results.filter(result => result.get('temColetaSeletiva')).length;

        // Atualizar dados no dashboard
        document.getElementById('dado1').textContent = `Quantidade de Escolas: ${quantidadeEscolas}`;
        document.getElementById('dado2').textContent = `Quantidade com energia: ${quantidadeComEnergia}`;
        document.getElementById('dado3').textContent = `Quantidade com água: ${quantidadeComAgua}`;
        document.getElementById('dado4').textContent = `Quantidade de escolas com coleta seletiva: ${quantidadeComColetaSeletiva}`;

        // Dados para os gráficos
        var data1 = {
            labels: ['Com água', 'Sem água'],
            datasets: [{
                data: [quantidadeComAgua, quantidadeEscolas - quantidadeComAgua],
                backgroundColor: ['blue', 'red']
            }]
        };

        var data2 = {
            labels: ['Com energia', 'Sem energia'],
            datasets: [{
                data: [quantidadeComEnergia, quantidadeEscolas - quantidadeComEnergia],
                backgroundColor: ['green', 'purple']
            }]
        };

        var data3 = {
            labels: ['Com coleta', 'Sem coleta'],
            datasets: [{
                data: [quantidadeComColetaSeletiva, quantidadeEscolas - quantidadeComColetaSeletiva],
                backgroundColor: ['gray', 'brown']
            }]
        };

        // Atualizar gráficos
        var options = {
            responsive: true,
            maintainAspectRatio: false
        };

        var ctx1 = document.getElementById('chart1').getContext('2d');
        var chart1 = new Chart(ctx1, {
            type: 'pie',
            data: data1,
            options: options
        });

        var ctx2 = document.getElementById('chart2').getContext('2d');
        var chart2 = new Chart(ctx2, {
            type: 'pie',
            data: data2,
            options: options
        });

        var ctx3 = document.getElementById('chart3').getContext('2d');
        var chart3 = new Chart(ctx3, {
            type: 'pie',
            data: data3,
            options: options
        });

    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
    }
}

fetchDataAndDisplay();