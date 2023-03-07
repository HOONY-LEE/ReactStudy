import './App.css';
import {useState} from 'react';



function Header(props) {
  // console.log('props', props, props.title);
  return <header>
  <h1><a href="/" onClick={function(event) {
    event.preventDefault();
    props.onChangeMode();
  }}>{props.title}</a></h1>
</header>
}

function Nav(props) {

  const lst = []

  for(let i=0; i < props.topics.length; i++) {
    let item = props.topics[i]
    lst.push(<li key={item.id}><a id={item.id} href={'/read/'+item.id} onClick={function(event) {
      event.preventDefault();
      props.onChangeMode(Number(event.target.id));
    }}  >{item.title} : {item.body}</a></li>)
  }

  return <nav>
    <ol>
      {lst}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
  <h2>{ props.title }</h2>
  { props.body }
</article>
}

function CreateForm(props) {
  return       <div>
  <h2>CREATE</h2>
  <div >
    <form className='input_form_boxs' onSubmit={function(event) {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);


    }}>
      <input type='text' name='title' placeholder='title'></input>
      <textarea placeholder='body' name='body'></textarea>
      <input type='submit' value="작성하기"></input>
    </form>
  </div>
</div>
}

function Update(props) {

  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.body);
  return       <div>
  <h2>UPDATE</h2>
  <div >
    <form className='input_form_boxs' onSubmit={function(event) {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpate(title, body);


    }}>
      <input type='text' name='title' placeholder='title' value={title} onChange={event=>{
        // console.log(event.target.value);
        setTitle(event.target.value)
      }}></input>
      <textarea placeholder='body' name='body' value={body} onChange={event=> {
        setBody(event.target.value);
      }}></textarea>
      <input type='submit' value="수정하기"></input>
    </form>
  </div>
</div> 
}


function App() {

  // const _mode = useState("WELCOME");
  // const mode = _mode[0];
  // const setMode = _mode[1];

  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId ] = useState(4);
  const [topics, setTopics] = useState([
    {id:1, title: "html", body: "html is something"},
    {id:2, title: "css", body: "css is something"},
    {id:3, title: "js", body: "js is something"},
  ])

  let content = null;
  let contextControl = null;

  if(mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB!!"></Article>
  } else if (mode === "READ") {

    let title = null;
    let body = null;
    for(let i=0; i < topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl =  <li><a href={'/update' + id} onClick={event => {
      event.preventDefault();
      setMode('UPDATE');

    }}>Update</a></li>
  } else if (mode === "CREATE") {
    content = <CreateForm onCreate={(title, body)=> {
      // console.log('title : ' + title);
      // console.log('body : ' + body);
      const newTopic = { title: title, body: body, id: nextId}
      const newTopics = [...topics]
      newTopics.push(newTopic);
      setTopics(newTopics);
      setMode('READ')
      setId(nextId)
      setNextId(nextId+1);
  
      
  
    }}></CreateForm>

  } else if (mode === "UPDATE") {
    let title, body = null;
    for(let i=0; i < topics.length; i++) {
      if(topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }

    content = <Update title={title} body={body} onUpate={(title, body)=> {
      // console.log('title :' + title);
      // console.log('body :' + body);
      const updatedTopic = {id: id, title: title, body: body};
      const newTopics = [...topics];
      for(let i=0; i < newTopics.length; i++) {
        if(newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('READ');
      
      
    }}></Update>
  }


  return (
    <div>
      <Header title="REACT" onChangeMode={function() {
        setMode("WELCOME")

      }}></Header>
      <Nav topics={topics} onChangeMode={function(id) {
        setMode("READ")
        setId(id)

      }}></Nav>
      {content}

      <ul>
        <li>
          <a href="/create" onClick={function(event) {
          event.preventDefault();
          setMode('CREATE')
          }}>Create</a>
        </li>
          {contextControl}
      </ul>
    </div>
  );
}

export default App;
