import React from 'react'
import { graphql, PageProps } from 'gatsby'
import Img from 'gatsby-image'

import { createStyles, makeStyles, Paper, Typography } from '@material-ui/core'

export type BlogPostProps = {
    contentfulBlogPost: {
        title: string
        publishDate: string
        body: {
            childMarkdownRemark: {
                html: string
            }
        }
    }
}

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            marginTop: '50px',
            color: theme.palette.text.primary,
        },
        hero: {
            margin: '-1em -2.5em 1em',
        },
        heroImage: {
            height: '61.8vh',
            maxHeight: '400px',
            position: 'relative',
        },
    }),
)
function BlogPostTemplate(props: PageProps<SiteData & BlogPostProps>) {
    const post = props.data.contentfulBlogPost
    const siteTitle = props.data.site.siteMetadata.title
    const classes = useStyles()
    return (
            <Paper className={classes.root}>
                <Typography variant={'h1'}>{post.title}</Typography>
                <Typography
                    variant={'body1'}
                    style={{
                        display: 'block',
                    }}
                >
                    {post.publishDate}
                </Typography>
                <div
                    dangerouslySetInnerHTML={{
                        __html: post.body.childMarkdownRemark.html,
                    }}
                />
            </Paper>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug{
        site {
            siteMetadata {
                title
            }
        }
    }
`
