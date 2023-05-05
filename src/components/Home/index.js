import {Component} from 'react'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import CourseCard from '../CourseCard'
import FailureView from '../FailureView'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    courseList: [],
  }

  componentDidMount() {
    this.getCourses()
  }

  retry = () => {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const coursesUrl = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(coursesUrl)

    if (response.ok) {
      const data = await response.json()
      const {courses} = data
      const updatedCourses = courses.map(eachCourse => ({
        id: eachCourse.id,
        name: eachCourse.name,
        logoUrl: eachCourse.logo_url,
      }))

      this.setState({
        apiStatus: apiStatusConstants.success,
        courseList: updatedCourses,
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
    const {courseList} = this.state

    return (
      <div className="success-view">
        <h1 className="home-title">Courses</h1>
        <ul className="courses-list-container">
          {courseList.map(eachCourse => (
            <CourseCard key={eachCourse.id} courseDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  renderHomeView = () => {
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
        <div className="responsive-container">{this.renderHomeView()}</div>
      </div>
    )
  }
}

export default Home
