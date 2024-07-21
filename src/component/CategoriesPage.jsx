import React, { useEffect, useState } from 'react'
import './CategoriesPage.css';
import { faker } from '@faker-js/faker';

import doubleRight from '../assets/icons/double-right.png';
import doubleLeft from '../assets/icons/double-left.png';
import leftArrow from '../assets/icons/left-arrow.png'
import rightArrow from '../assets/icons/right-arrow.png'
import tickIcon from '../assets/icons/check.png'
import { useDispatch, useSelector } from 'react-redux';
import { profileInfoAction } from '../store/profileInfoSlice';
const CategoriesPage = () => {
    const profileInfo = useSelector(state => state.profiles);
    const credential = useSelector(state => state.loginCredentials)
    const loggedProfile = useSelector(state => state.loggedProfile);
    const dispatch = useDispatch();
    const [allCategories, setAllCategories] = useState([]);
    const [listedCategories, setListedCategories] = useState([]);
    const [currPage, setCurrPage] = useState(1);
    const [checkedCat, setCheckedCat] = useState([]);
    const [totalPage, setTotalPage] = useState();
    const [itemPerPage, setItemPerPage] = useState(6);
    const [pageNumber, setPageNumber] = useState([]);


    const getAllCategories = (n) => {
        const arr = [];
        for (let i = 0; i < n; i++) {

            const cat = faker.commerce.department();

            if (!arr.includes(cat)) {
                arr.push(cat);
            }

        }

        setAllCategories(arr);
    }

    useEffect(() => {

        setListedCategories(() => {

            return allCategories.filter((item, index) => {
                if (currPage === 1) {
                    return index < itemPerPage;
                } else if (currPage > 1) {
                    return index >= (itemPerPage * (currPage - 1)) && index < (itemPerPage * currPage);
                }
            })

        })

    }, [currPage, allCategories])


    const handleChecked = (n) => {

        setCheckedCat((pre) => {

            if (pre && pre.includes(n)) {
                return pre.filter((item) => {
                    return item !== n;
                })
            } else {
                return [...pre, n]
            }

        })
    }

    const handlePagination = (n) => {

        switch (n) {
            case 'first':
                setCurrPage(1);
                break;
            case 'previous':
                setCurrPage(pre => (pre - 1));
                break;
            case 'next':
                setCurrPage(pre => (pre + 1));
                break;
            case 'last':
                setCurrPage(totalPage);
                break;
        }

    }



    const pagination = () => {
        const count = 3;
        const division = [];
        for (let i = 0; i < totalPage; i++) {
            if (i && i % count === 0) {
                division.push(i);
            }
        }

        let page = [];
        for (let i = 0; i < division.length; i++) {

            if (currPage <= division[0]) {

                for (let j = 1; j <= division[0]; j++) {
                    page.push(j);
                }
                page.push('...')
                break;
            } else if (currPage <= division[i]) {
                for (let k = (division[i - 1] + 1); k <= division[i]; k++) {
                    page.push(k)
                }
                page.push('...')
                break;
            } else if (currPage > division[division.length - 1]) {

                for (let l = (division[division.length - 1] + 1); l <= totalPage; l++) {
                    page.push(l);
                }
                break;
            }

        }
        setPageNumber(page);
    }


    useEffect(() => {
        getAllCategories(1000);
        setCheckedCat(() => {
            return profileInfo[loggedProfile].checkedCategory
        });
    }, [])


    useEffect(() => {
        setTotalPage(() => {
            return Math.ceil(allCategories.length / itemPerPage)
        });
        pagination();

    }, [totalPage, allCategories, currPage])

    useEffect(() => {
        dispatch(profileInfoAction.setProfile({ [loggedProfile]: { checkedCategory: checkedCat } }));
    }, [checkedCat])

    return (
        <div className='category'>
            <div>
                <h1>Please mark your interests!</h1>
                <p>We will keep you notified!</p>
            </div>
            <div>
                <div>My saved interests!</div>
                <div className='categories'>
                    {listedCategories
                        .filter((item, ind) => ind < (itemPerPage * currPage))
                        .map((item, ind) => (
                            <div key={ind} onClick={() => { handleChecked(item) }}>
                                <div>
                                    <img className={checkedCat && checkedCat.includes(item) ? 'checked' : 'unchecked'} src={tickIcon} alt="" />
                                </div>
                                <div>{item}</div>
                            </div>
                        ))}
                </div>
                <div className='pagination'>
                    <div>
                        <img src={doubleLeft} alt="" onClick={() => { handlePagination('first') }} />
                    </div>
                    <div className={currPage === 1 ? 'disable' : ''}>
                        <img src={leftArrow} alt="" onClick={() => { handlePagination('previous') }} />
                    </div>
                    <div className='page-count'>
                        {
                            pageNumber && pageNumber.map((item, ind) => {
                                return <div key={ind} className={currPage === item ? 'active-page' : ''}>{item}</div>
                            })
                        }
                    </div>
                    <div className={currPage === totalPage ? 'disable' : ''}>
                        <img src={rightArrow} alt="" onClick={() => { handlePagination('next') }} />
                    </div>
                    <div>
                        <img src={doubleLeft} alt="" onClick={() => { handlePagination('last') }} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CategoriesPage
