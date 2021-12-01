import React from 'react';
import { Pagination as PaginationSU } from 'semantic-ui-react';
import { useRouter } from 'next/router';
import queryString from 'query-string';

export default function Pagination(props) {
    const { totalGames, page, limitPerPage, onPageChange } = props;
    const totalPages = Math.ceil(totalGames / limitPerPage);
    const router = useRouter();
    const urlParse = queryString.parseUrl(router.asPath);

    const goToPage = (newPage) => {
        // console.log(newPage);
        urlParse.query.page = newPage;
        const newUrl = queryString.stringifyUrl(urlParse);
        router.push(newUrl);
    }

    return (
        <div>
            <PaginationSU
                defaultActivePage={page}
                totalPages={totalPages}
                firstItem={null}
                lastItem={null}
                onPageChange={(e, { activePage }) => {
                    const query = queryString.parse(window.location.search);
                    query.page = activePage;
                    onPageChange(query);
                }}
                boundaryRange={0}
                siblingRange={1}
                ellipsisItem={null}
            />
        </div>
    )
}
