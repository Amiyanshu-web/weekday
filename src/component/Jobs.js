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
        minJdSalary: '',
        remote:'',
        company:''
    });

    const handleFilterChange = (updatedFilters) => {
        setFilters(updatedFilters);
        setFilteredJobs([]); // Clear the filteredJobs state

        // Filter jobs based on the provided filters
        let filteredJob = [...jobs];

        // Check if minExp filter is provided
        if (updatedFilters.minExp !== '') {
            filteredJob = filteredJob.filter(job => job.minExp >= parseInt(updatedFilters.minExp));
        }

        // Check if location filter is provided
        if (updatedFilters.location !== '') {
            filteredJob = filteredJob.filter(job => job.location?.toLowerCase() === updatedFilters.location?.toLowerCase());
        }

        // Check if remote filter is provided
        if (updatedFilters.remote !== '') {
            filteredJob = filteredJob.filter(job => job.remote?.toLowerCase() === updatedFilters.remote?.toLowerCase());
        }

        // Check if jobRole filter is provided
        if (updatedFilters.jobRole !== '') {
            filteredJob = filteredJob.filter(job => job.jobRole === updatedFilters.jobRole);
        }

        // Check if minJdSalary filter is provided
        if (updatedFilters.minJdSalary !== '') {
            filteredJob = filteredJob.filter(job => job.minJdSalary >= parseInt(updatedFilters.minJdSalary));
        }

        if (updatedFilters.company !== '') {
            filteredJob = filteredJob.filter(job => job.companyName?.toLowerCase() === updatedFilters.company?.toLowerCase());
        }

        setFilteredJobs(filteredJob);
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

    console.log(filteredJobs);
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
