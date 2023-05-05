import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CourseItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseItemDetails: {},
  }

  componentDidMount() {
    this.getCoursesDetails()
  }

  retry = () => {
    this.getCoursesDetails()
  }

  getCoursesDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    const {id} = params
    const coursesDetailsUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(coursesDetailsUrl)

    if (response.ok) {
      const data = await response.json()
      const courseDetails = data.course_details
      const updatedCourseDetails = {
        id: courseDetails.id,
        name: courseDetails.name,
        imageUrl: courseDetails.image_url,
        description: courseDetails.description,
      }

      this.setState({
        apiStatus: apiStatusConstants.success,
        courseItemDetails: updatedCourseDetails,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFailureView = () => <FailureView retry={this.retry} />

  renderSuccessView = () => {
    const {courseItemDetails} = this.state
    const {id, name, imageUrl, description} = courseItemDetails

    return (
      <div className="course-success-view">
        <img src={imageUrl} className="course-item-image" alt={name} />
        <div className="course-details">
          <h1 className="course-title">{name}</h1>
          <p className="course-description">{description}</p>
        </div>
      </div>
    )
  }

  renderCourseDetailsView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="responsive-container">
          {this.renderCourseDetailsView()}
        </div>
      </div>
    )
  }
}

export default CourseItemDetails
