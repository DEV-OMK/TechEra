import Header from '../Header'
import './index.css'

const NotFound = () => (
  <div className="main-container">
    <Header />
    <div className="responsive-container">
      <div className="not-found-card">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/not-found-img.png"
          className="not-found-image"
          alt="not found"
        />
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="caption">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    </div>
  </div>
)

export default NotFound
