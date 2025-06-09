import InnerBanner from '@/components/innerBanner'
import backgroundImage from "@/banner/privacy-policy.jpg";
import { Container, Typography } from '@mui/material'
import React from 'react'
import { nunito } from '@/utils/fonts';

const PrivacyPolicy = () => {
  return (
    <>
    <InnerBanner img={backgroundImage.src} heading={"Our Privacy Policy"} />
    <Container sx={{py:{xs:4, sm:6, md:8}}}>
        <Typography variant='body1' sx={{fontFamily:nunito.style}}>
            We care about data privacy and security. By using the Site, you agree to be bound by our Privacy Policy, which is incorporated into these Terms of Use. Please be advised the Site is hosted in India.
            <br/> <br/>
If you access the Site from the European Union, Asia, or any other region of the world with laws or other requirements governing personal data collection, use, or disclosure that differ from applicable laws in India, then through your continued use of the Site, you are transferring your data to India, and you expressly consent to have your data transferred to and processed in India.
 <br/> <br/>
We respect the intellectual property rights of others. If you believe that any material available on or through the Site infringes upon any copyright you own or control, please immediately notify our Designated Copyright Agent using the contact information provided below (a “Notification”).
 <br/> <br/>
A copy of your Notification will be sent to the person who posted or stored the material addressed in the Notification. Please be advised that pursuant to federal law you may be held liable for damages if you make material misrepresentations in a Notification. Thus, if you are not sure that material located on or linked to by the Site infringes your copyright, you should consider first contacting an attorney.
 <br/> <br/>
(1) A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.
 <br/> <br/>
(2) Identification of the copyrighted work claimed to have been (2) Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works on the Site are covered by the Notification, a representative list of such works on the Site.
 <br/> <br/>
(3) Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material.
 <br/> <br/>
(4) Information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an email address at which the complaining party may be contacted.
 <br/> <br/>
(5) A statement that the complaining party has a good faith belief that the use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.
 <br/> <br/>
(6) A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed upon.
 <br/> <br/>
(7) Identification of the material that has been removed or disabled and the location at which the material appeared before it was removed or disabled.
 <br/> <br/>
(8) A statement that you consent to the jurisdiction of the court in which your address is located, or if your address is outside India, for any judicial district in which we are located.
 <br/> <br/>
(9) A statement that you will accept service of process from the party that filed the Notification or the party’s agent.
 <br/> <br/>
(10) your name, address, and telephone number.
 <br/> <br/>
(11) A statement under penalty of perjury that you have a good faith belief that the material in question was removed or disabled as a result of a mistake or misidentification of the material to be removed or disabled.
 <br/> <br/>
(12) Your physical or electronic signature.
 <br/> <br/>
If you send us a valid, written Counter Notification meeting the requirements described above, we will restore your removed or disabled material, unless we first receive notice from the party filing the Notification informing us that such party has filed a court action to restrain you from engaging in infringing activity related to the material in question.
 <br/> <br/>
Please note that if you materially misrepresent that the disabled or removed content was removed by mistake or misidentification, you may be liable for damages, including costs and attorney’s fees. Filing a false Counter Notification constitutes perjury.
        </Typography>
    </Container>
    </>
  )
}

export default PrivacyPolicy