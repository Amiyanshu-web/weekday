import React from 'react';

const JobCard = ({jobRole, location, jobDetailsFromCompany, minExp, jdLink }) => {
  
    const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);
    
    return (
    <div className="card">
      <div className="companyInfo">
        <img className="companyLogo" src="https://via.placeholder.com/50" alt="Weekday"/>
        <div className='title'>
          <span className="companyName">Weekday</span>
          <span className="jobTitle">{jobRole}</span>
            <span className="location">{location}</span>
        </div>
      </div>
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