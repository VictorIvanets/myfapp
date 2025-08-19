import Flex from "src/components/Flex/Flex"
import "./conatcts.sass"
import type { PaidFishingT } from "src/types/fishing"
import { IoIosCloseCircle } from "react-icons/io"

interface ContactProps {
  setContactsView: React.Dispatch<React.SetStateAction<boolean>>
  paid?: PaidFishingT
}

const PaidContacts = ({ paid, setContactsView }: ContactProps) => {
  return (
    <Flex column gap={10} centerV className="contacts">
      <Flex className="contacts__header" centerV spredV>
        <h3>КОНТАКТИ</h3>
        <h1 className="icomhover" onClick={() => setContactsView(false)}>
          <IoIosCloseCircle />
        </h1>
      </Flex>
      <Flex gap={10} column>
        {paid && <h1>{paid.title}</h1>}
        {paid && <h3>Контакт:</h3>}
        {paid && <h2>{paid.owner}</h2>}
        <Flex column>
          {paid && paid.contact.map((i, index) => <h3 key={index}>{i}</h3>)}
        </Flex>
      </Flex>
    </Flex>
  )
}

export default PaidContacts
