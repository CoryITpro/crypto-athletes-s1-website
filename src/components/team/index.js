import "./style.scss"

const generateTeam = () => <div></div>

const TeamMembers = () => (
  <div className="team">
    <div className="team-wrapper flex flex-column">
      <div className="team-title">Team</div>
      <div className="team-members flex">{generateTeam()}</div>
    </div>
  </div>
)

export default TeamMembers
