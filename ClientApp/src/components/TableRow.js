import {useState} from 'react'

const TableRow = (props)=>{		
	const [book, setBook] = useState(Object.assign({}, props.book));	
	const [prevBook, setPrevBook] = useState(Object.assign({}, props.book));			
	const [editing, setEditing] = useState(props.edit);	
			
	const addHandler = () => {
		
	};
		
	const changeHandler = () => {	
		if( window.confirm("сохранить изменения?") )
		{	
			fetch('books/change',
			{
				method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify(book)
			}).then(()=>{			
				setPrevBook(Object.assign({}, book));		
				setEditing(false);
			});
		}
	};
	
	const canselHandler = () => {
		setBook(Object.assign({}, prevBook));
		setEditing(false);
	};	
	
	const deleteHandler = (btn, id) => {
		var row = btn.parentNode.parentNode;
		
		if( window.confirm("вы действительно хотите удалить книгу?") )
		{	
			fetch('books/delete',
			{
				method: 'POST',
                headers: new Headers({ 'Content-Type': 'application/json' }),
                body: JSON.stringify({ 
					"id": book.id
				})
			})			
			.then(()=>{ row.parentNode.removeChild(row); })
            .then(data => console.log(data)) 
		}
	};
		
	const setProp = (name, target) => {
		book[name] = target.value;
		setBook(Object.assign({}, book));
	};
		
	return (
			<>
			{	
				editing 
				? (		
					<tr key={book.id}>
						<td>{book.id}</td>
						<td><input type="text" value={book.name} onChange={({ target }) => setProp("name", target)} /></td>
						<td><input type="text" value={book.year} onChange={({ target }) => setProp("year", target)} /></td>
						<td><input type="text" value={book.genre} onChange={({ target }) => setProp("genre", target)} /></td>
						<td><input type="text" value={book.autor} onChange={({ target }) => setProp("autor", target) } /></td>
						<td>
							<button 
								style={{ border:0, background:0, paddingLeft: "30px" }}
								onClick={e => changeHandler()}
							>
								✓
							</button>
							<button 
								style={{ border:0, background:0, paddingLeft: "30px", transform: "scale(-1, 1)" }}
								onClick={e => canselHandler()}
							> 
								✖
							</button>
						</td>
					</tr>	
				) 				
				: (	
					<tr key={book.id}>
						<td>{book.id}</td>
						<td>{book.name}</td>
						<td>{book.year}</td>
						<td>{book.genre}</td>
						<td>{book.autor}</td>
						<td>
							<button 
								style={{ border:0, background:0, paddingRight: "30px", transform: "scale(-1, 1)" }}
								onClick={e => setEditing(true)}
							> 
								✎
							</button>
							<button 
								style={{ border:0, background:0, paddingLeft: "30px" }}
								onClick={e => deleteHandler(e.target, book.id) }
							>
								🗑️
							</button>
						</td>
					</tr>					
				)			
			}
			</>
	);	
};

export default TableRow;