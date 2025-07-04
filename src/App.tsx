import React, { useState, useEffect } from 'react';
import { Code, Eye, Trash2, Monitor, ChevronDown, ChevronUp, FileText, Link, List, Table, Edit3, Layout, Star } from 'lucide-react';

const popularTags = [
  { tag: '<h1>', description: 'заголовок', color: 'from-red-400 to-red-600', textColor: 'text-white' },
  { tag: '<p>', description: 'абзац', color: 'from-blue-400 to-blue-600', textColor: 'text-white' },
  { tag: '<div>', description: 'блок', color: 'from-green-400 to-green-600', textColor: 'text-white' },
  { tag: '<a>', description: 'ссылка', color: 'from-purple-400 to-purple-600', textColor: 'text-white' },
  { tag: '<img>', description: 'картинка', color: 'from-orange-400 to-orange-600', textColor: 'text-white' },
  { tag: '<button>', description: 'кнопка', color: 'from-pink-400 to-pink-600', textColor: 'text-white' },
  { tag: '<ul>', description: 'список', color: 'from-indigo-400 to-indigo-600', textColor: 'text-white' },
  { tag: '<li>', description: 'элемент', color: 'from-teal-400 to-teal-600', textColor: 'text-white' },
  { tag: '<span>', description: 'строка', color: 'from-yellow-400 to-yellow-600', textColor: 'text-gray-800' },
  { tag: '<strong>', description: 'жирный', color: 'from-gray-400 to-gray-600', textColor: 'text-white' }
];

const tagCategories = {
  structure: {
    name: '🧱 Структура и разметка',
    tags: [
      { tag: '<html>', description: 'корень HTML-документа' },
      { tag: '<head>', description: 'метаинформация' },
      { tag: '<body>', description: 'основное содержимое' },
      { tag: '<div>', description: 'блочный контейнер' },
      { tag: '<span>', description: 'строчный контейнер' }
    ],
    color: 'from-blue-500 to-blue-700',
    icon: '🧱'
  },
  text: {
    name: '📝 Текст и заголовки',
    tags: [
      { tag: '<h1>', description: 'основной заголовок' },
      { tag: '<h2>', description: 'подзаголовок' },
      { tag: '<h3>', description: 'заголовок третьего уровня' },
      { tag: '<p>', description: 'абзац текста' },
      { tag: '<strong>', description: 'жирный акцент' },
      { tag: '<em>', description: 'курсивный акцент' },
      { tag: '<br>', description: 'перенос строки' }
    ],
    color: 'from-green-500 to-green-700',
    icon: '📝'
  },
  links: {
    name: '🔗 Ссылки и медиа',
    tags: [
      { tag: '<a href="">', description: 'ссылка' },
      { tag: '<img src="" alt="">', description: 'изображение' }
    ],
    color: 'from-purple-500 to-purple-700',
    icon: '🔗'
  },
  lists: {
    name: '📋 Списки',
    tags: [
      { tag: '<ul>', description: 'список с точками' },
      { tag: '<ol>', description: 'нумерованный список' },
      { tag: '<li>', description: 'элемент списка' }
    ],
    color: 'from-orange-500 to-orange-700',
    icon: '📋'
  },
  tables: {
    name: '🧮 Таблицы',
    tags: [
      { tag: '<table>', description: 'таблица' },
      { tag: '<tr>', description: 'строка таблицы' },
      { tag: '<td>', description: 'ячейка таблицы' }
    ],
    color: 'from-red-500 to-red-700',
    icon: '🧮'
  },
  forms: {
    name: '✅ Формы',
    tags: [
      { tag: '<form>', description: 'форма' },
      { tag: '<input type="text">', description: 'поле ввода' },
      { tag: '<label>', description: 'подпись элемента' },
      { tag: '<button>', description: 'кнопка' }
    ],
    color: 'from-pink-500 to-pink-700',
    icon: '✅'
  },
  additional: {
    name: '⚙️ Дополнительно',
    tags: [
      { tag: '<section>', description: 'логический раздел' },
      { tag: '<header>', description: 'верхняя часть' },
      { tag: '<footer>', description: 'нижняя часть' },
      { tag: '<main>', description: 'основной контент' },
      { tag: '<nav>', description: 'навигационное меню' }
    ],
    color: 'from-gray-500 to-gray-700',
    icon: '⚙️'
  }
};

function App() {
  const [htmlCode, setHtmlCode] = useState('<!DOCTYPE html>\n<html>\n<head>\n  <title>Мой сайт</title>\n</head>\n<body>\n  <h1>Добро пожаловать!</h1>\n  <p>Это мой первый сайт.</p>\n</body>\n</html>');
  const [cssCode, setCssCode] = useState('body {\n  font-family: Arial, sans-serif;\n  margin: 0;\n  padding: 20px;\n  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);\n  color: white;\n}\n\nh1 {\n  color: #ffeb3b;\n  text-align: center;\n}\n\np {\n  font-size: 18px;\n  line-height: 1.6;\n}');
  const [previewContent, setPreviewContent] = useState('');
  const [activeView, setActiveView] = useState<'html' | 'css' | 'preview'>('html');
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [showInstructions, setShowInstructions] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const combinedContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>${cssCode}</style>
        </head>
        <body>
          ${htmlCode.replace(/<!DOCTYPE html>|<html>|<\/html>|<head>.*?<\/head>|<body>|<\/body>/gs, '')}
        </body>
      </html>
    `;
    setPreviewContent(combinedContent);
  }, [htmlCode, cssCode]);

  const addTag = (tag: string) => {
    const textarea = document.querySelector(`#${activeView === 'html' ? 'html' : 'css'}-editor`) as HTMLTextAreaElement;
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      
      if (activeView === 'html') {
        const newHtml = htmlCode.substring(0, start) + tag + htmlCode.substring(end);
        setHtmlCode(newHtml);
        
        setTimeout(() => {
          textarea.focus();
          textarea.setSelectionRange(start + tag.length, start + tag.length);
        }, 0);
      }
    }
  };

  const clearCode = (type: 'html' | 'css') => {
    if (type === 'html') {
      setHtmlCode('<!DOCTYPE html>\n<html>\n<head>\n  <title>Новый документ</title>\n</head>\n<body>\n  \n</body>\n</html>');
    } else {
      setCssCode('');
    }
  };

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const getViewIcon = (view: string) => {
    switch(view) {
      case 'html': return <Code className="w-4 h-4" />;
      case 'css': return <Edit3 className="w-4 h-4" />;
      case 'preview': return <Eye className="w-4 h-4" />;
      default: return <Code className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">HTML+CSS Редактор</h1>
                <p className="text-sm text-gray-600">Создавайте веб-страницы на мобильном устройстве</p>
              </div>
            </div>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showInstructions ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
            </button>
          </div>
          

        </div>
      </div>

      {/* Popular Tags Slider - Mobile Optimized */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 py-4">
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 p-1.5 rounded-full mr-2">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-gray-800">🔥 Популярные теги</h2>
          </div>
          
          {/* Mobile-first horizontal scroll */}
          <div className="overflow-x-auto scrollbar-hide -mx-1">
            <div className="flex gap-2 pb-2 px-1" style={{ width: 'max-content' }}>
              {popularTags.map((item, index) => (
                <button
                  key={index}
                  onClick={() => addTag(item.tag)}
                  className={`flex-shrink-0 bg-gradient-to-br ${item.color} ${item.textColor} 
                    px-3 py-2.5 rounded-xl shadow-md transition-all duration-200 
                    hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm
                    min-w-[70px] text-center border border-white/20`}
                >
                  <div className="font-mono text-xs font-bold whitespace-nowrap leading-tight">
                    {item.tag}
                  </div>
                  <div className="text-[10px] opacity-90 mt-0.5 font-medium">
                    {item.description}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Scroll hint for mobile */}
          <div className="text-center mt-2">
            <div className="inline-flex items-center text-xs text-gray-500 bg-white/60 px-2 py-1 rounded-full">
              <span>← Прокрутите для просмотра всех тегов →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Horizontal Slider */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-3 py-4">
          <div className="flex items-center mb-3">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-1.5 rounded-full mr-2">
              <Layout className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-base font-bold text-gray-800">📚 Категории тегов</h2>
          </div>
          
          {/* Horizontal Categories */}
          <div className="overflow-x-auto scrollbar-hide -mx-1">
            <div className="flex gap-3 pb-2 px-1" style={{ width: 'max-content' }}>
              {Object.entries(tagCategories).map(([key, category]) => (
                <button
                  key={key}
                  onClick={() => setSelectedCategory(selectedCategory === key ? null : key)}
                  className={`flex-shrink-0 bg-gradient-to-br ${category.color} text-white 
                    px-4 py-3 rounded-xl shadow-md transition-all duration-200 
                    hover:scale-105 hover:shadow-lg active:scale-95 active:shadow-sm
                    min-w-[120px] text-center border border-white/20 ${
                      selectedCategory === key ? 'ring-2 ring-yellow-400 ring-offset-2' : ''
                    }`}
                >
                  <div className="text-lg mb-1">{category.icon}</div>
                  <div className="text-xs font-bold leading-tight">
                    {category.name.replace(/^[🧱📝🔗📋🧮✅⚙️]\s/, '')}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Selected Category Tags */}
          {selectedCategory && (
            <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">
                {tagCategories[selectedCategory as keyof typeof tagCategories].name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {tagCategories[selectedCategory as keyof typeof tagCategories].tags.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => addTag(item.tag)}
                    className="text-left p-2 rounded-lg bg-white hover:bg-blue-50 hover:border-blue-300 
                      border border-gray-200 transition-all duration-200 group shadow-sm hover:shadow-md"
                  >
                    <div className="font-mono text-xs text-blue-600 group-hover:text-blue-800 font-bold">
                      {item.tag}
                    </div>
                    <div className="text-[10px] text-gray-500 mt-1 leading-tight">
                      {item.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Scroll hint */}
          <div className="text-center mt-2">
            <div className="inline-flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
              <span>← Выберите категорию для просмотра тегов →</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'html', label: 'HTML', icon: 'html' },
              { id: 'css', label: 'CSS', icon: 'css' },
              { id: 'preview', label: 'Превью', icon: 'preview' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id as 'html' | 'css' | 'preview')}
                className={`flex-1 flex items-center justify-center px-4 py-3 text-sm font-medium transition-colors ${
                  activeView === tab.id
                    ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                {getViewIcon(tab.icon)}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            {activeView === 'html' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">HTML код:</label>
                  <button
                    onClick={() => clearCode('html')}
                    className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Очистить
                  </button>
                </div>
                <textarea
                  id="html-editor"
                  value={htmlCode}
                  onChange={(e) => setHtmlCode(e.target.value)}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Введите HTML код здесь..."
                />
              </div>
            )}

            {activeView === 'css' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">CSS код:</label>
                  <button
                    onClick={() => clearCode('css')}
                    className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Очистить
                  </button>
                </div>
                <textarea
                  id="css-editor"
                  value={cssCode}
                  onChange={(e) => setCssCode(e.target.value)}
                  className="w-full h-96 p-4 border border-gray-300 rounded-lg font-mono text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                  placeholder="Введите CSS код здесь..."
                />
              </div>
            )}

            {activeView === 'preview' && (
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">Превью:</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <iframe
                    srcDoc={previewContent}
                    className="w-full h-96 border-none"
                    title="Превью"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default App;