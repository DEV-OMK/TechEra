import {Link} from 'react-router-dom'
import './index.css'

const CourseCard = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails

  return (
    <Link to={`/courses/${id}`} style={{textDecoration: 'none'}}>
      <li className="course-card">
        <img src={logoUrl} className="course-logo" alt={name} />
        <p className="course-name">{name}</p>
      </li>
    </Link>
  )
}

export default CourseCard
