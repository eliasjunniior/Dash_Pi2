Parse.initialize('jFc8weoj0ooJf9ImqkiTjVg8bkJ1FfPS9nBPjUHS', '1jzfDQ7nCu6UgkoBAwUpqQ3mpg8hpEL5t6auoAAZ');
Parse.serverURL = 'https://parseapi.back4app.com';


async function fetchDataAndDisplay() {
    const TestObject = Parse.Object.extend('TestObject');
    const query = new Parse.Query(TestObject);
    try {
        const results = await query.find();
        const container = document.getElementById('data-container');
        results.forEach(result => {
            const item = document.createElement('div');
            item.className = 'item';
            item.textContent = result.get('content'); // Substitua 'someField' pelo nome do campo que você deseja exibir
            container.appendChild(item);
        });
    } catch (error) {
        console.error('Erro ao buscar dados: ', error);
    }
}

fetchDataAndDisplay();