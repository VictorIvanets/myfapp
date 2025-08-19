import "./paid.sass"
import { memo } from "react"
import Flex from "src/components/Flex/Flex"
import InputText from "src/components/Input/InputText"
import List from "src/components/List"
import useGetPaid from "src/hooks/useGetPaid"
const PaidPlace = memo(() => {
  const {
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    allItems,
    valueTitle,
    setValueTitle,
    valueDescription,
    setValueDescription,
  } = useGetPaid()

  return (
    <>
      <Flex centerH className="allfishingpage">
        <Flex column className="allfishingpage__list">
          <InputText
            value={valueTitle}
            onChange={(e) => setValueTitle(e.target.value)}
            id="input_title_search"
            label="Пошук по назві"
            searchLabel
          />
          <InputText
            value={valueDescription}
            onChange={(e) => setValueDescription(e.target.value)}
            id="input_descriptoin_search"
            label="Пошук за описом"
            searchLabel
          />
          <List
            hasNextPage={hasNextPage}
            fetchNextPage={fetchNextPage}
            isLoading={isLoading}
            isFetchingNextPage={isFetchingNextPage}
            data={allItems}
          />
          {isError && <h4>{error?.message}</h4>}
        </Flex>
      </Flex>
    </>
  )
})

export default PaidPlace
