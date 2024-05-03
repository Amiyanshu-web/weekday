import React from 'react';

const JobCard = ({ jobRole, location, jobDetailsFromCompany, minExp, jdLink, companyName, minJdSalary, maxJdSalary }) => {
  
    const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
    
    return (
    <div className="card">
      <div className="companyInfo">
        <img className="companyLogo" src="https://via.placeholder.com/50" alt="Weekday"/>
        <div className='title'>
          <span className="companyName">{companyName}</span>
          <span className="jobTitle">{jobRole}</span>
            <span className="location">{location}</span>
        </div>
      </div>
        <b>Estimated Salary: $ {minJdSalary} - {maxJdSalary}</b>
      <h3>About Company</h3>
      <h4>About Us</h4>
      <p className={`description ${isDescriptionExpanded ? 'expanded' : ''}`}>{isDescriptionExpanded ? jobDetailsFromCompany : jobDetailsFromCompany.substring(0, 100)}</p>
      <button className='viewJobButton' onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}>{isDescriptionExpanded ? 'Hide' : 'View Job'}</button>
      <p className="experience">{`Minimum Experience: ${minExp?minExp:"NA"}`} Years</p>
      <a className="applyButton" href={jdLink}>
        <div className="applyButtonInner">
          <span className="applyButtonText"> 🔥 Easy Apply</span>
        </div>
      </a>
    </div>
  );
};

export default JobCard;