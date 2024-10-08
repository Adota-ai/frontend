import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Dialog, DialogContent, DialogTrigger } from "@radix-ui/react-dialog"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"


export default  function CarouselSize() {
  
  return (
    
    <div className=" bg-gray-300  flex w-screen h-screen ">
    
    <div className="flex flex-col w-full">
    
      <div className="flex justify-center">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full max-w-3xl p-10"
        >
          <CarouselContent className="flex justify-center">
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/1 lg:basis-1/2">
                <div className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <span className="text-3xl font-semibold">{index + 1}</span>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      
      <div className="bg-white p-6  rounded-lg shadow-lg w-[50%] ml-20">
        <h2 className="text-xl font-bold mb-4">Área de Doação</h2>
        <p className="mb-4">Ajude a manter as Ongs Ativas! Faça sua doação abaixo</p>
        <Dialog>
            <DialogTrigger asChild>
            <Button className="bg-gray-500 text-white px-4 py-2 rounded-md">
               Doar Agora
            </Button>
            </DialogTrigger>
            <DialogContent>
             Escolha Uma Ong Para doar
             <Popover >
             <PopoverTrigger className="">Open</PopoverTrigger>
            <PopoverContent>Place content for the popover here.</PopoverContent>
            </Popover>

            </DialogContent>
        </Dialog>
      </div>
    </div>

    
    <div className="ml-6 w-1/4 bg-white p-6 rounded-lg mr-10 shadow-lg flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Status das Suas Adoções</h2>
      <p>Status :  <span className="font-semibold">Ativo</span></p>
      <p className="mt-4"> <span className="font-semibold"></span></p>
    </div>
  </div>
)
}
