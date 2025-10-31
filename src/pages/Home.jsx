import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function Home() {
  return (
    <section>


<Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Photography Projects</Card.Title>
        <Card.Text>
          My Photography portfolio and projects.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>


      <h2>Welcome</h2>
      <p>Your hub for projects, notes, and security resources.</p>
    </section>
  );
}

