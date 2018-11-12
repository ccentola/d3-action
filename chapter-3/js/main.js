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

        // add circles
        teamG
            .append('circle')
            .attr('r', 20);

        // add labels
        teamG
            .append('text')
            .style('text-anchor', 'middle')
                .attr('y', 30)
                .text(d => d.team);
    }
}
