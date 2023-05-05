import './index.css'

const FailureView = props => {
  const {retry} = props
  const onClickRetry = () => {
    retry()
  }

  return (
    <div className="failure-view-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
        className="failure-view-image"
        alt="failure view"
      />
      <h1 className="failure-view-title">Oops! Something Went Wrong</h1>
      <p className="caption">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-button" onClick={onClickRetry}>
        Retry
      </button>
    </div>
  )
}

export default FailureView
