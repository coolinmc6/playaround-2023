import React, { useCallback, useMemo, useState } from 'react';

const createItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `Item #${i + 1}`
  }))
}

type ListProps = {
  items: any[]
  onDelete: (id: number) => void
  title: string;
}

const List = ({ items, onDelete, title }: ListProps) => {
  console.log('List rendered');
  return (
    <div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <ul>
        {items.map(item => (
          <li key={item.id} className="my-2">
            {item.name}
            <button className="bg-red-500 text-white text-sm py-1 px-2 rounded hover:bg-red-700 ml-4" onClick={() => onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};


const OptimizedList = React.memo(({ items, onDelete, title }: ListProps) => {
  console.log('Optimized List rendered');
  return (
    <div>
      <h3 className="text-xl font-bold text-center">{title}</h3>
      <ul>
        {items.map(item => (
          <li key={item.id} className="my-2">
            {item.name}
            <button className="bg-red-500 text-white text-sm py-1 px-2 rounded hover:bg-red-700 ml-4" onClick={() => onDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
});

OptimizedList.displayName = 'OptimizedList'

const UseCallbackComponent = () => {
  const [items, setItems] = useState(() => createItems(5000))
  const [uselessToggle, setUselessToggle] = useState(false);

  const handleToggle = () => {
    setUselessToggle(!uselessToggle);
  }

  const handleDelete = (itemId: number) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const optimizedHandleDelete = useCallback((itemId: number) => {
    setItems(items.filter(item => item.id !== itemId));
  }, [items])

  return (
    <div className="mt-4">
      <h1 className="text-3xl font-bold pb-12">useCallback and React.memo</h1>
      <p className="pb-6">
        This section shows 4 separate implementations of the same list. The &quot;UseLess Toggle&quot; button
        is used to toggle an item in the parent component, forcing the lists to re-render. If you open the
        Profiler in dev tools, start recording, and click the button - you can see what is happening.
      </p>
      <p className="pb-6">

      </p>
      <div className="text-center">
        <button className="bg-blue-500 text-white text-lg font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out transform shadow-lg" onClick={handleToggle}>Useless Toggle</button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        <List items={items} onDelete={handleDelete} title="No UseCallback, no React.memo" />
        <List items={items} onDelete={optimizedHandleDelete} title="UseCallback, no React.memo"/>
        <OptimizedList items={items} onDelete={handleDelete} title="No UseCallback, React.memo"/>
        <OptimizedList items={items} onDelete={optimizedHandleDelete} title="UseCallback, React.memo"/>
      </div>
    </div>
  )
}

export default UseCallbackComponent;
