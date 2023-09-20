// Write your code here
import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    inputList: [],
    title: '',
    date: '',
    starred: false,
  }

  searchTitle = event => {
    this.setState({title: event.target.value})
  }

  searchDate = event => {
    this.setState({date: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date} = this.state
    const newContent = {
      id: uuidv4(),
      title,
      date,
      star: false,
    }
    this.setState(prevState => ({
      inputList: [...prevState.inputList, newContent],
      title: '',
      date: '',
    }))
  }

  toggleFav = id => {
    this.setState(prevState => ({
      inputList: prevState.inputList.map(each => {
        if (id === each.id) {
          return {...each, star: !each.star}
        }
        return each
      }),
    }))
  }

  isStared = () => {
    this.setState(prevState =>
      prevState.starred === false ? {starred: true} : {starred: false},
    )
  }

  render() {
    const {inputList, title, date, starred} = this.state
    let searchResults = inputList
    if (starred === true) {
      searchResults = inputList.filter(each => each.star === true)
    }
    const colorChange = starred ? 'change' : ''
    return (
      <div className="bg-con">
        <div className="card-con">
          <div className="card">
            <div className="card1">
              <h1 className="head"> Add Appointment</h1>
              <form className="form-con" onSubmit={this.onAddAppointment}>
                <label className="label1" htmlFor="input1">
                  Title <br />
                  <input
                    id="input1"
                    type="text"
                    placeholder="Title"
                    className="input"
                    onChange={this.searchTitle}
                    value={title}
                  />
                </label>
                <br />
                <label className="label1" htmlFor="dateInput1">
                  Date <br />
                  <input
                    value={date}
                    id="dateInput1"
                    type="date"
                    placeholder="Title"
                    className="input"
                    onChange={this.searchDate}
                  />
                </label>
                <br />
                <button className="button" type="submit">
                  Add
                </button>
              </form>
            </div>

            <div className="img-con">
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="image"
                alt="appointments"
              />
            </div>
          </div>
          <hr className="hr-line" />

          <div className="app">
            <div className="app-con">
              <h1 className="heading">Appointments</h1>
            </div>
            <div className="start">
              <button
                type="button"
                onClick={this.isStared}
                className={`butt ${colorChange}`}
              >
                Starred
              </button>
            </div>
          </div>
          <ul className="unOrder-con">
            {searchResults.map(each => (
              <AppointmentItem
                key={each.id}
                details={each}
                toggleFav={this.toggleFav}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
