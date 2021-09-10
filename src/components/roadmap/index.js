import "./style.scss"

import { Roadmaps } from "constants/index"

const generateRoadmap = () =>
  Roadmaps.map((data, index) => (
    <div key={index} className="roadmap-item flex flex-column">
      <div className="roadmap-item-percentage">{`${data.percentage}%`}</div>
      <div className="roadmap-item-comment">{data.comment}</div>
    </div>
  ))

const Roadmap = () => (
  <div className="roadmap flex flex-column">
    <span>Roadmap</span>
    {generateRoadmap()}
  </div>
)

export default Roadmap
