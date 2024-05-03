import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import JobCard from './JobCard';
import FilterComponent from './Filters';

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const limit = 10;
    const totalCount = 11657;
    const [filters, setFilters] = useState({
        minExp: '',
        location: '',
        jobRole: '',
        minJdSalary: ''
    });

    const handleFilterChange = (updatedFilters) => {
        // Parse minExp and minJdSalary to integers
        updatedFilters.minExp =parseInt(updatedFilters.minExp);
        updatedFilters.minJdSalary = parseInt(updatedFilters.minJdSalary);

        console.log(updatedFilters.minExp);

        setFilters(updatedFilters);
        // Filter jobs based on the provided filters
        const filteredJobs = jobs.filter(job => {
            // Implement your filtering logic here based on the updatedFilters object
            // For example:
            return (
                // (updatedFilters.minExp === '' || job.minExp >= parseInt(updatedFilters.minExp)) &&
                // (updatedFilters.location === '' || job.location === updatedFilters.location) &&
                (updatedFilters.jobRole === '' || job.jobRole === updatedFilters.jobRole) 
                // &&
                // (updatedFilters.minJdSalary === '' || job.minJdSalary <= parseInt(updatedFilters.minJdSalary))
            );
        });
        setFilteredJobs(filteredJobs);
    };


    const fetchJobs = async () => {
        if (isLoading) return;

        setIsLoading(true);
        setHasMore(false);
        const body = JSON.stringify({
            limit,
            offset
        });

        const response = await axios.post(
            'https://api.weekday.technology/adhoc/getSampleJdJSON',
            body
        );
        console.log(hasMore);
        if (response.data) setHasMore(jobs.length < totalCount);
        const newJobs = await response.data.jdList;
        setJobs((prevJobs) => [...prevJobs, ...newJobs]);
        setOffset((prevOffset) => prevOffset + limit);
        // setHasMore(newJobs.length === limit);
        setIsLoading(false);
    };

    console.log(filters);
    // setHasMore();
    // if(jobs.length < totalCount)    setHasMore(true);   

    return (
        <div>
            <FilterComponent filters={filters} onFilterChange={handleFilterChange} />
            {filteredJobs.length == 0 ? (
            <InfiniteScroll
                loadMore={fetchJobs}
                hasMore={hasMore}
                // hasMore = {jobs.length<totalCount}
                loader={<div className='loader'>Loading...</div>}
            >
                <div className='jobCards'>
                        {jobs.map((job) => (
                            <JobCard key={job.jdUid} {...job} />
                        ))}
                </div>
               
            </InfiniteScroll>):(
                    <div className='jobCards'>
                        {filteredJobs.map((job) => (
                            <JobCard key={job.jdUid} {...job} />
                        ))}
                    </div>
            )}
        </div>
    );
};

export default Jobs;
