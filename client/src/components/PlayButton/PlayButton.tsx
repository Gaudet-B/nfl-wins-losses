import { PropsWithChildren } from 'react'
import { ButtonContainer, ButtonImg, ButtonText } from './styles'

function Button({
  children,
  onClick,
}: PropsWithChildren<{ onClick: () => void }>) {
  return (
    <button className="flex gap-2 items-center" onClick={onClick}>
      {children}
    </button>
  )
}

export function PlayButton({ handleClick }: { handleClick: () => void }) {
  return (
    <ButtonContainer>
      <Button onClick={handleClick}>
        <ButtonImg />
        <ButtonText />
      </Button>
    </ButtonContainer>
  )
}
