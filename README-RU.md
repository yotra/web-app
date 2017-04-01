Каждому типу данных соответствует свой контрол - ДОМ-элемент.
- для ввода данных (инпут, селекте, датапикер и т.п.)
- для отображения данных (спан, див и т.п)

Разные типы данных могут быть представлены однотипным контролом:
- строка <input type=text>
- ЮРЛ <input type=text>

Каждый контрол ввода данных эмитит события:
- change - при финальном изменении
- keyup - во время ввода символов
- и др.

Хранилище может обновляться при любом нужном событии.

Изоморфное приложение позволяет только генерировать статическую разметку на серверной стороне. Любые события, объявленные в контроле будут проигнорированы.
Поэтому обработчики программно добавляются отдельно от статической разметки, используя всплытие и перехват.
Но в то же время в коде нужно хранить рядом - и обработчики и статическую разметку - для улучшения читабельности.

Документ (или корневой элемент) перехватывает все события изменения контролов ввода данных.

Если перечислять все типы инпутов, то нужно полностью перечислять весь ДОМ. Наверно лучше опираться только на свои типы.
Хотя наверно лучше следовать тому самому сопоставлению

Например контрол возраста должен сам определять ошибку, которая появляется при неправильном вводе.

Искать все контролы и привязывать ошибки, когда статическая разметка готова.
либо
Использовать перехват событий и определять ошибки на уровне корневого элемента.






Обычно кнопки добавляют/обновляют/удаляют данные
Инпуты позволяют не связывать кнопку (сабмит) с инпутом
Логика по выбору айдишника для новой записи
Если идшники туристов заняты, как пользователю выбрать?
Сделать тип: от 1 до 10 - исключая уже использованные.

Общую картинку довольно трудно воссоздать.
Типы данных определяются для конкретного проекта.
Также как и соответствующие контролы.

Любой проект содержит Item + ItemList
Любой тип данных - это и есть Item

Булевый тип (домен) состоит из двух записей в базе данных
id     name
true   SuperTrue
false  SuperFalse

NumberType
id  name
1   N1
2   N2
...
1234 N1234

Это всё типы данных, в большинстве случаев состоящие из одного ид

{
  name: String,
  age: Age,
  person: Person
}

В отличие от структур - простые типы однозначно определяются одним значением.
Простые типы - это по сути автогенерируемые таблицы. Например Номер - это таблица из 32степень записей (чисел)

https://types/number/1
https://types/person/123

// перечисляемого типа
Type 
Month = (Jan, Feb, Mar, Apr, May, Jun, Jul, Aug, Sep, Oct, Nov, Dec); 
DayOfWeek = (Sun, Mon, Tue, Wen, Thu, Fri, Sat); 

// Интервальные типы

Year = 1900..2000; 
Letter = "A".."Z";

// Строковые типы

- набор симоволов - массив
Строка - это упакованный массив, компоненты которого имеют тип Char и тип индекса имеет нижнюю границу равную одному. К строкам применимы все 6 операций отношений, но строки при этом должны иметь равную длину.


Генерация разметки из вью-модели универсальна.
Все эти плюшки для вьюшки - 90% стили, 10% яваскрипт

Рендеринг проекта на серверной стороне.
---

- парсинг юрл-параметров
- построение модели на основе параметров
- вычисление калькулируемых свойств
- построение разметки на основе модели
- выдача разметки на клиент