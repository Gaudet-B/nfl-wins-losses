# NFL Wins and Losses by Team

### a data visualization project by Brian Gaudet

## To Run Locally

1. Clone this repository
2. Ensure you have `pnpm` installed locally as that is the package manager for this project.
3. Using a terminal, navigate to the `client` directory and run:

```
pnpm install
```

and then:

```
pnpm dev
```

4. Open a browser and navigate to `localhost:5173`

## Summary

Data can be used to tell some really compelling stories. However, presenting those storeis isn't always an easy task. For this reason simple, bold, and eye-catching visualizations are becoming more and more essential in today's world as experts and more technical people attempt to reach lay people.

The problem is a simple one - how to display data in a visually interesting way, so that it can be understood intuitively and can help people make informed decisions. The solution, however, isn't so simple.

This project uses d3.js to programmatically and dynamically render SVG elements. As opposed to using a charting library (Nivo, Recharts) or even Observable Plot - an abstraction built on top of d3 - this project uses d3 directly for more granular control. This is best illustrated by the fact that the entire view is an SVG, not just the circular barplot itself. This will be helpful when implementing future features such as an easy "download" button that allows the user to save the entire "infographic" on screen.

Future features to be implemented include thew aforementioned downloadable image, as well as a "play" button that programatically steps through the timeline so the user can see the bars in the chart change over time.
