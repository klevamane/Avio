import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * set the page meta details including the title, description and keywords
 * @param   {string} title  The page title
 * @param   {string} description   The page description
 * @param   {string} keywords   seo keywords
 * @return  {string} <Helmet title={title} description={description} keyword={keyword}>
 */
const Meta = ({ title, description, keywords }) => {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name='description' content={description}></meta>
			<meta name='keyword' content={keywords}></meta>
		</Helmet>
	);
};

export default Meta;
