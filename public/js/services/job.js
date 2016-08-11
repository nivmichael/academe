angular.module('acadb.services.job', []).value('version', '0.1')

.factory('Job', function($http, $rootScope, $q, PostData ) {

    var jobsArr;
    var jobs;
   // var jobsForUser;
   // var jobCount;
    return {
        getJobs: function(){
            //
            if(!jobsArr){
                jobsArr = PostData.list().$promise.then(function(posts){
                    console.log(posts);
                    jobsArr = posts;
                    return $q.when(jobsArr);
                })
            }
            return $q.when(jobsArr);
        },
        getJobsAgain: function(){


            jobsArr = PostData.list().$promise.then(function(posts){
                console.log(posts);
                jobsArr = posts;
                return $q.when(jobsArr);
            })

            return $q.when(jobsArr);
        },
        getJob: function(id){
            if(!jobs[id]){
                jobs[id] = PostData.get({id: id}).$promise.then(function(post){
                    jobs[id] = post;
                    return $q.when(jobs[id]);
                })
            }
            return $q.when(jobs[id])
        }

    };

})