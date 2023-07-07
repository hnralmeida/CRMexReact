import Box from '@mui/material/Box';
import { Player } from '@lottiefiles/react-lottie-player';

/**  
 * @param componete - animação de carregamento que parece antes de fazer qualquer post ou get.
 * 
 *   @author Henrique 
 */

export default function Loading() {
    return (
        <Box sx={{
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1,
        }}>
            {/* <Player src={'../../asstes/loader.json'} autoplay loop /> */}
        </Box>
    );
}