// Get CSV data and assign dropdown based on uniques
d3.csv("topemps.csv").then(function(data){
  console.log(data);
  var employer = data.map(row => row.employer_name);
  let unique_employer = [...new Set(employer)]; 
  console.log(unique_employer);
  var dropdownMenu = d3.select("#selDataset");
  unique_employer.forEach(employer_name=>dropdownMenu.append("option").text(employer_name));
});
// Used to pass dropdown value into chart building function
function optionChanged(sample){
  buildCharts(sample);
}
// Used to split columns into labels and counts
function based(arr) {
  var a = [], b = [], prev;

  arr.sort();
  for ( var i = 0; i < arr.length; i++ ) {
      if ( arr[i] !== prev ) {
          a.push(arr[i]);
          b.push(1);
      } else {
          b[b.length-1]++;
      }
      prev = arr[i];
  }

  return [a, b];
}
// Plot building function
function buildCharts(sample) {
  d3.csv("topemps.csv").then((data)=> {
    // Filter function to only grab values associated with dropdown pass
    function filterByValue(array, string) {
      return array.filter(o =>
          Object.keys(o).some(k => o[k].toLowerCase().includes(string.toLowerCase())));
    }
    var filtered_data = (filterByValue(data,sample));
    var country_of_citizenship = filtered_data.map(row => row.country_of_citizenship)
    var foreign_worker_info_education = filtered_data.map(row => row.foreign_worker_info_education)
    var job_info_work_city = filtered_data.map(row => row.job_info_work_city)
    var job_info_work_state = filtered_data.map(row => row.job_info_work_state)
    var pw_amount_9089 = filtered_data.map(row => row.pw_amount_9089)
    var naics_us_title = filtered_data.map(row => row.naics_us_title)
    var year = filtered_data.map(row => row.year)
    var salary = filtered_data.map(row => row.salary)
    var decision_time = filtered_data.map(row => row.decision_time)
    
     
    var trace1 = {
      type: "bar",
      x: based(salary)[0],
      y: based(salary)[1],
    };

    var barData = [trace1];

    var barLayout = {
      title: "Salary",
      yaxis: { title: "Visa Applicants"}
    };

    Plotly.newPlot("bar", barData, barLayout);

    var trace2 = {
      type: "pie",
      labels: based(naics_us_title)[0],
      values: based(naics_us_title)[1],
    };

    var pieData = [trace2];

    var pieLayout = {
      title: "Job Titles",
    };

    Plotly.newPlot("pie", pieData, pieLayout);

    var bar2 = {
      type: "bar",
      x: based(job_info_work_city)[0],
      y: based(job_info_work_city)[1],
    };

    var bar2Data = [bar2];

    var bar2Layout = {
      title: "Job City",
      yaxis: { title: "Visa Applicants"}
    };

    Plotly.newPlot("bar2", bar2Data, bar2Layout);

    var bar3 = {
      type: "bar",
      x: based(country_of_citizenship)[0],
      y: based(country_of_citizenship)[1],
    };

    var bar3Data = [bar3];

    var bar3Layout = {
      title: "Applicant Country",
      yaxis: { title: "Visa Applicants"}
    };

    Plotly.newPlot("bar3", bar3Data, bar3Layout);

    var scat1 = {
      x: based(decision_time)[0],
      y: based(decision_time)[1],
      mode: 'markers',
      type: 'scatter',
      marker: { size: 12 }
    };

    var scat1Data = [scat1];

    var scat1Layout = {
      title: "Decision Time (days)",
      yaxis: { title: "Visa Applicants"}
    };

    Plotly.newPlot("scat1", scat1Data, scat1Layout);

    var pie2 = {
      type: "pie",
      labels: based(foreign_worker_info_education)[0],
      values: based(foreign_worker_info_education)[1],
    };

    var pie2Data = [pie2];

    var pie2Layout = {
      title: "Applicant Education",
    };

    Plotly.newPlot("pie2", pie2Data, pie2Layout);

  });
}