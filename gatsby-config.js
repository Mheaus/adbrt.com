module.exports = {
  siteMetadata: {
    title: `Math Adbrt Profile Website`,
    description: `This is my profile website.`,
    author: `@mheaus`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-styled-components`,
      options: {
        displayName: true,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `mheaus-profile-website`,
        short_name: `adbrtweb`,
        start_url: `/`,
        background_color: `#0079DF`,
        theme_color: `#0079DF`,
        display: `minimal-ui`,
        icon: `src/assets/icons/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
};
