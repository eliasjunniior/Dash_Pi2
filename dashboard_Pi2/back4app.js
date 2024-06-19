Parse.initialize('Gh9UJWigIWkfrkieRZXmkbMi5SOmXUy6SZhxhlSD', 'iNr65O5aKejciJMKUYFirb1LNKeeDhUb0zxsk7AL');
Parse.serverURL = 'https://parseapi.back4app.com';

async function fetchDataAndDisplay() {
    const TestObject = Parse.Object.extend('censo_inep_2023');
    const limit = 1000; // Limite máximo de registros por consulta
    let skip = 0; // como é o inicio natural começar de 0
    let allQuantidadeEscolas = 0;
    let allQuantidadeComEnergia = 0;
    let allQuantidadeComAgua = 0;
    let allQuantidadeComEsgoto = 0;

    try {
        while (true) {
            const query = new Parse.Query(TestObject);
            query.select('IN_ENERGIA_REDE_PUBLICA', 'IN_AGUA_REDE_PUBLICA', 'IN_ESGOTO_REDE_PUBLICA'); // Selecionar apenas os campos necessários
            query.limit(limit);
            query.skip(skip);

            const results = await query.find();
            
            if (results.length === 0) {
                break; // Se não há mais resultados, sair do loop
            }

            // Atualizando incrementalmente os dados da consulta
            allQuantidadeEscolas += results.length;
            allQuantidadeComEnergia += results.filter(result => result.get('IN_ENERGIA_REDE_PUBLICA') === 1).length;
            allQuantidadeComAgua += results.filter(result => result.get('IN_AGUA_REDE_PUBLICA') === 1).length;
            allQuantidadeComEsgoto += results.filter(result => result.get('IN_ESGOTO_REDE_PUBLICA') === 1).length;

            // Atualizar dados no dashboard incrementalmente
            document.getElementById('dado1').textContent = `Quantidade de Escolas: ${allQuantidadeEscolas}`;
            document.getElementById('dado2').textContent = `Quantidade com energia: ${allQuantidadeComEnergia}`;
            document.getElementById('dado3').textContent = `Quantidade com água: ${allQuantidadeComAgua}`;
            document.getElementById('dado4').textContent = `Quantidade de escolas com esgoto: ${allQuantidadeComEsgoto}`;

            // Incrementar o valor de skip para buscar o próximo conjunto de dados
            skip += limit;

            // Adcionando o pequeno delay para evitar a sobrecarga do servidor
            await new Promise(resolve => setTimeout(resolve, 100));
        }


        // Dados para os gráficos
        var data1 = {
            labels: ['Com água', 'Sem água'],
            datasets: [{
                data: [allQuantidadeComAgua, allQuantidadeEscolas - allQuantidadeComAgua],
                backgroundColor: ['blue', 'red']
            }]
        };

        var data2 = {
            labels: ['Com energia', 'Sem energia'],
            datasets: [{
                data: [allQuantidadeComEnergia, allQuantidadeEscolas - allQuantidadeComEnergia],
                backgroundColor: ['green', 'purple']
            }]
        };

        var data3 = {
            labels: ['Com esgoto', 'Sem esgoto'],
            datasets: [{
                data: [allQuantidadeComEsgoto, allQuantidadeEscolas - allQuantidadeComEsgoto],
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

window.onload = fetchDataAndDisplay;