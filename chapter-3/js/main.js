/*
d3.csv('data/world_cup.csv', data => console.log(data[0].team));
*/

function createSoccerViz() {
    d3.csv('data/world_cup.csv', data => { overallTeamViz(data)})

    function overallTeamViz(incomingData) {
        d3.select('svg')
            .append('g')
            .attr('id', 'teamsG')
            .attr('transform', 'translate(50,30)')
            .selectAll('g')
            .data(incomingData)
            .enter()
            .append('g')
            .attr('class', 'overallG')
            .attr('transform', (d,i) => 'translate('+ (i * 50) + ',0)');

        var teamG = d3.selectAll('g.overallG');

        // add circles - transition adds intro animation
        teamG
            .append('circle')
            .attr('r', 0)
            .transition()
            .delay((d,i) => i * 100)
            .duration(500)
            .attr('r', 40)
            .transition()
            .duration(500)
            .attr('r', 20);

        // add labels
        teamG
            .append('text')
            .style('text-anchor', 'middle')
                .attr('y', 30)
                .text(d => d.team);

        // highlight region on mouseover
        teamG.on('mouseover', highlightRegion);

        // set active and inactive classes to false on mouseout
        teamG.on('mouseout', function() {
            d3.selectAll('g.overallG')
                .select('circle')
                .classed('inactive', false)
                .classed('active', false)
        })

        // highlight teams from the same region
        function highlightRegion(d) {
            d3.selectAll('g.overallG')
                .select('circle')
                .attr('class', p => p.region === d.region ? 'active' : 'inactive');
        }

        // add keys for all columns excluding teams and region
        var dataKeys = Object.keys(incomingData[0])
            .filter(d => d !== 'team' && d !== 'region');

        d3.select('#controls').selectAll('button.teams')
            .data(dataKeys)
            .enter()
            .append('button')
                .on('click', buttonClick)
                .html(d => d);

        function buttonClick(dataPoint) {
            var maxValue = d3.max(incomingData, d => parseFloat(d[dataPoint]));
            var radiusScale = d3.scaleLinear()
                .domain([0, maxValue])
                .range([2, 20]);

            d3.selectAll('g.overallG')
                .select('circle')
                .transition()
                .duration(1000)
                .attr('r', d => radiusScale(d[dataPoint]));
        }
    }
}
