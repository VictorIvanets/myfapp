import type { ColorItemCardT, ColorsKey } from "src/shared/colorSchemaCard"
import "./addpoast.sass"
import Flex from "src/components/Flex/Flex"

type Props = {
  setColorValue: (name: ColorsKey) => void
  colorValue: ColorsKey
} & ColorItemCardT

const ColorCard = ({
  background,
  text,
  name,
  setColorValue,
  colorValue,
}: Props) => {
  return (
    <div
      onClick={() => setColorValue(name)}
      style={{
        backgroundColor: background,
        borderWidth: colorValue === name ? "3px" : "1px",
      }}
      className="colorcard"
    >
      <Flex flex center>
        <p className="colorcard__text" style={{ color: text }}>
          Text
        </p>
      </Flex>
    </div>
  )
}

export default ColorCard
