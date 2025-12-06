export const Image = ({left, top, id}) => {

    return (
        
        <img 
            key={id}
            style={{
                position: "absolute",
                left,
                top
            }}
            src="/assets/images/car.jpg" alt="" />            
    
    )
}