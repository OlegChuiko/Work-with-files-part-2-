const fs = require('fs');

//npm install csv-parser - встановити модуль "csv-parser"
const csv = require('csv-parser');

const FILE_PATH = './shopping_list.csv';

// Функція для додавання продуктів у список 
function addItem(name, quantity) {
  const data = `${name},${quantity}\n`;
  fs.appendFileSync(FILE_PATH, data);
  console.log(`Товар ${name} додано до списку покупок`);
}

// Функція для отримання даних про продукт за його унікальним ідентифікатором
function FindProductById(id, FILE_PATH) {
    let data = fs.readFileSync(FILE_PATH, 'utf8');

    data = data.split('\r\n');
    
    for (let i = 0; i < data.length; i++) {
        if (id == data[i].split(',')[0]) {
            return data[i];
        }
    }
};

// Функція для видалення продукту зі списку за його унікальним ідентифікатором
function deleteItemById(id) 
{
  let items = [];
  fs.createReadStream(FILE_PATH)
    .pipe(csv())
    .on('data', (data) => 
    {
      if (data.id !== id) 
      {
        items.push(data);
      }
    })
    .on('end', () => 
    {
      fs.writeFileSync(FILE_PATH, '');
      items.forEach((item) => 
      {
        const data = `${item.name},${item.quantity}\n`;
        fs.appendFileSync(FILE_PATH, data);
      });
      console.log(`Товар з id ${id} видалено зі списку покупок`);
    });
}

// Функція для зміни продукту за його унікальним ідентифікатором
function updateItemById(id, name) 
{
  let items = [];
  fs.createReadStream(FILE_PATH)
    .pipe(csv())
    .on('data', (data) =>
     {
      if (data.id !== id) 
      {
        items.push(data);
      } else 
      {
        const updatedItem = { id, name};
        items.push(updatedItem);
      }
    })
    .on('end', () => 
    {
      fs.writeFileSync(FILE_PATH, '');
      items.forEach((item) => 
      {
        const data = `${item.name}\n`;
        fs.appendFileSync(FILE_PATH, data);
      });
      console.log(`Інформація про товар з id ${id} оновлено`);
    });
    }
    
    // Приклад використання функцій:
    
    addItem('Яблука',    1);
    addItem('Банани',    2);
    addItem('Апельсини', 3);
    
    

    // При виклику функції addItem() буде додано нові товари до файлу shopping_list.csv
    // При виклику функції getItemById() буде повернута інформація про товар 
    // При виклику функції deleteItemById() буде видалено товар з файлу shopping_list.csv
    // При виклику функції updateItemById() буде оновлена інформація про товар в файлі shopping_list.csv
