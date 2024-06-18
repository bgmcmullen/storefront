import Cart from '../Cart';

function Header() {

  return (
    <section style={{position: 'fixed', background: 'white', margin: 0, padding: '10px', width: "100%"}}>
      <h1 style={{display: 'inline', fontSize: '35px'}}>OUR STORE</h1>
      <Cart />
    </section>

  );
}

export default Header;