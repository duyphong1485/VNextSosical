import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import lodash from 'lodash'
import { LoadingSpinner } from '../loading'
const HeaderWrapper = styled.header`
  background-color: ${(props) => props.theme.cardBackground};
  color: ${(props) => props.theme.text};
  padding: 15px 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 10;
  transition:
    background-color 0.3s ease,
    color 0.3s ease;
`

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
`

const HeaderTop = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
  gap: 40px;
`

const HeaderLogo = styled.img`
  width: 180px;
  height: auto;
  transition: transform 0.2s ease;
  &:hover {
    transform: scale(1.05);
  }
`

const NavLinks = styled.div`
  display: flex;
  gap: 30px;
`

const HeaderNavLink = styled(RouterLink)`
  color: rgb(245, 151, 10);
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  transition: color 0.2s ease;
  &:hover {
    color: orange;
  }
`

const SearchArea = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 700px;
  justify-content: center;
`

const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`


const InputIcon = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  cursor: pointer;
`

const ProfileAvatar = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid rgb(245, 151, 10);
  transition: border-color 0.2s ease;
  &:hover {
    border-color: orange;
  }
`

const SearchBar = styled.input<{ hasIcon?: boolean }>`
  width: 100%;
  padding: ${(props) => (props.hasIcon ? '20px 60px 20px 20px' : '15px 15px')};
  background-color: ${(props) => props.theme.grayLight || '#fff'};
  border: 1px solid #df0303;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 500;
  color: #000;
  outline: none;
  transition: all 0.2s ease;

  &::placeholder {
    color: #31598f;
  }

  &:focus {
    background-color: #d8d3cd;
    border-color: ${(props) => props.theme.primary || '#007aff'};
  }
`

const SearchResults = styled.div`
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  background-color: ${(props) => props.theme.background};
  color: ${(props) => props.theme.text};
  border-top: none;
  max-height: 300px;
  overflow-y: auto;
  z-index: 20;
`

const SearchResultItem = styled.div`
  padding: 10px;
  cursor: pointer;
  &:hover {
    background-color: #f2f2f2;
  }
`

interface SearchResult {
  objectID: string
  title: string
  url: string
  author: string
  points: number
}

export const Header: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('')
  const [results, setResults] = React.useState<SearchResult[]>([])
  const [loading, setLoading] = React.useState(false)

  const handleSearchChange = lodash.debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }, 500)

  React.useEffect(() => {
    if (searchTerm.trim() === '') {
      setResults([])
      return
    }
    const fetchResults = async () => {
      try {
        setLoading(true)
        const response = await axios.get(
          //`http://localhost:8000/api/friends/?query${encodeURIComponent(searchTerm)}`
          `https://hn.algolia.com/api/v1/search?query=${encodeURIComponent(searchTerm)}`
        )
        setResults(response.data.hits || [])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching search results:', error)
        setLoading(false)
      }
    }
    fetchResults()
  }, [searchTerm])

  return (
    <HeaderWrapper>
      <HeaderContent>
        <HeaderTop>
          <HeaderLogo src='Logo.png' alt='VNext Social' />
          <NavLinks>
            <HeaderNavLink to='/homepage'>Home</HeaderNavLink>
            <HeaderNavLink to='/profile'>Profile</HeaderNavLink>
            <HeaderNavLink to='/find-friend'>Find Friend</HeaderNavLink>
          </NavLinks>
        </HeaderTop>
        <SearchArea>
          <ProfileAvatar src='anhdaidien.png' alt='User Avatar' />
          <SearchContainer>
            <SearchBar type='text' placeholder='Search friends' onChange={handleSearchChange} />
            {loading && (
              <div style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)' }}>
                <LoadingSpinner size='20px' borderSize='2px' />
              </div>
            )}
            {results.length > 0 && (
              <SearchResults>
                {results.map((item, index) => (
                  <SearchResultItem key={index}>{item.title || item.author}</SearchResultItem>
                ))}
              </SearchResults>
            )}
          </SearchContainer>
        </SearchArea>
      </HeaderContent>
    </HeaderWrapper>
  )
}
