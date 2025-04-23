import './list.scss'
import Card from "../card/Card"

function List({ posts }) {
  if (!posts || posts.length === 0) {
    return (
      <div className="list empty">
        <p>No properties found</p>
      </div>
    );
  }

  return (
    <div className='list'>
      {posts.map(item => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}

export default List;